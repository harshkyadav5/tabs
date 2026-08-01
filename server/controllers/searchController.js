import pool from "../db/db.js";

export const getSearchStats = async (req, res) => {
  try {
    const userId = req.user.id;

    const [bookmarks, notes, clipboard, screenshots, colors, music] = await Promise.all([
      pool.query(
        `SELECT COUNT(*) FROM bookmarks WHERE user_id=$1 AND is_deleted=false AND is_archived=false`,
        [userId]
      ),
      pool.query(
        `SELECT COUNT(*) FROM notes WHERE user_id=$1 AND is_deleted=false AND is_archived=false`,
        [userId]
      ),
      pool.query(
        `SELECT COUNT(*) FROM clipboard_items WHERE user_id=$1 AND is_deleted=false AND is_archived=false`,
        [userId]
      ),
      pool.query(
        `SELECT COUNT(*) FROM screenshots WHERE user_id=$1 AND is_deleted=false`,
        [userId]
      ),
      pool.query(
        `SELECT COUNT(*) FROM saved_colors WHERE user_id=$1 AND is_archived=false`,
        [userId]
      ),
      pool.query(
        `SELECT COUNT(*) FROM music WHERE user_id=$1 AND is_deleted=false`,
        [userId]
      ),
    ]);

    res.json({
      total_bookmarks: Number(bookmarks.rows[0].count),
      total_notes: Number(notes.rows[0].count),
      total_clipboard: Number(clipboard.rows[0].count),
      total_screenshots: Number(screenshots.rows[0].count),
      total_colors: Number(colors.rows[0].count),
      total_music: Number(music.rows[0].count),
    });
  } catch (err) {
    console.error("getSearchStats error:", err);
    res.status(500).json({ error: "Failed to fetch search stats" });
  }
};

export const getSearchSuggestions = async (req, res) => {
  try {
    const userId = req.user.id;
    const { query } = req.query;
    const limit = Math.min(Number(req.query.limit) || 8, 20);

    if (!query || !query.trim()) {
      return res.json({ suggestions: [] });
    }

    const term = `%${query.trim()}%`;

    const [bookmarks, notes, tags] = await Promise.all([
      pool.query(
        `SELECT title, url FROM bookmarks
         WHERE user_id=$1 AND is_deleted=false AND is_archived=false AND title ILIKE $2
         ORDER BY modified_at DESC LIMIT $3`,
        [userId, term, limit]
      ),
      pool.query(
        `SELECT title FROM notes
         WHERE user_id=$1 AND is_deleted=false AND is_archived=false AND title ILIKE $2
         ORDER BY modified_at DESC LIMIT $3`,
        [userId, term, limit]
      ),
      pool.query(
        `SELECT DISTINCT tag FROM notes, unnest(tags) AS tag
         WHERE user_id=$1 AND is_deleted=false AND is_archived=false AND tag ILIKE $2
         LIMIT $3`,
        [userId, term, limit]
      ),
    ]);

    const suggestions = [
      ...bookmarks.rows.map((b) => ({ type: "bookmark", text: b.title || b.url, category: "Bookmark" })),
      ...notes.rows.map((n) => ({ type: "note", text: n.title, category: "Note" })),
      ...tags.rows.map((t) => ({ type: "tag", text: t.tag, category: "Tag" })),
    ].slice(0, limit);

    res.json({ suggestions });
  } catch (err) {
    console.error("getSearchSuggestions error:", err);
    res.status(500).json({ error: "Failed to fetch search suggestions" });
  }
};

export const searchAll = async (req, res) => {
  try {
    const userId = req.user.id;
    const { query, filters } = req.body;
    const limit = Math.min(Number(req.body.limit) || 20, 50);

    if (!query || !query.trim()) {
      return res.status(400).json({ error: "Query is required" });
    }

    const term = `%${query.trim()}%`;
    const activeFilters =
      Array.isArray(filters) && filters.length > 0
        ? filters
        : ["bookmarks", "notes", "clipboard", "screenshots", "colors", "music"];

    const results = {};
    let total = 0;

    const run = async (key, sql, params) => {
      if (!activeFilters.includes(key)) return;
      const result = await pool.query(sql, params);
      results[key] = result.rows;
      total += result.rows.length;
    };

    await Promise.all([
      run(
        "bookmarks",
        `SELECT id, title, url, description, view_count, created_at, modified_at
         FROM bookmarks
         WHERE user_id=$1 AND is_deleted=false AND is_archived=false
           AND (title ILIKE $2 OR url ILIKE $2 OR description ILIKE $2)
         ORDER BY modified_at DESC LIMIT $3`,
        [userId, term, limit]
      ),
      run(
        "notes",
        `SELECT id, title, content, tags, created_at, modified_at
         FROM notes
         WHERE user_id=$1 AND is_deleted=false AND is_archived=false
           AND (title ILIKE $2 OR content ILIKE $2)
         ORDER BY modified_at DESC LIMIT $3`,
        [userId, term, limit]
      ),
      run(
        "clipboard",
        `SELECT id, description, content, created_at, modified_at
         FROM clipboard_items
         WHERE user_id=$1 AND is_deleted=false AND is_archived=false
           AND (description ILIKE $2 OR content ILIKE $2)
         ORDER BY modified_at DESC LIMIT $3`,
        [userId, term, limit]
      ),
      run(
        "screenshots",
        `SELECT id, web_url, image_url, created_at, modified_at
         FROM screenshots
         WHERE user_id=$1 AND is_deleted=false AND web_url ILIKE $2
         ORDER BY modified_at DESC LIMIT $3`,
        [userId, term, limit]
      ),
      run(
        "colors",
        `SELECT id, hex_code, rgb_code, label, tags, created_at
         FROM saved_colors
         WHERE user_id=$1 AND is_archived=false
           AND (label ILIKE $2 OR hex_code ILIKE $2 OR EXISTS (
             SELECT 1 FROM unnest(tags) AS t WHERE t ILIKE $2
           ))
         ORDER BY created_at DESC LIMIT $3`,
        [userId, term, limit]
      ),
      run(
        "music",
        `SELECT id, track_name, artist, genre, cover_image, created_at
         FROM music
         WHERE user_id=$1 AND is_deleted=false
           AND (track_name ILIKE $2 OR artist ILIKE $2)
         ORDER BY created_at DESC LIMIT $3`,
        [userId, term, limit]
      ),
    ]);

    res.json({ query: query.trim(), filters: activeFilters, total, results });
  } catch (err) {
    console.error("searchAll error:", err);
    res.status(500).json({ error: "Search failed" });
  }
};
