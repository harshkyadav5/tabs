import pool from "../db/db.js";

export const getSuggestions = async (req, res) => {
  try {
    const userId = req.user.id;

    const [
      mostVisitedBookmark,
      unopenedBookmark,
      recentNote,
      todoNote,
      pinnedClipboard,
      recentClipboard,
      favoriteScreenshot,
      recentScreenshot,
      latestColor,
      favoriteMusic,
      recentMusic,
    ] = await Promise.all([
      // BOOKMARKS
      pool.query(
        `SELECT id, title, url, view_count
         FROM bookmarks
         WHERE user_id=$1 AND is_deleted=false AND is_archived=false
         ORDER BY view_count DESC NULLS LAST, modified_at DESC
         LIMIT 1`,
        [userId]
      ),
      pool.query(
        `SELECT id, title, url, view_count
         FROM bookmarks
         WHERE user_id=$1 AND is_deleted=false AND is_archived=false AND COALESCE(view_count,0)=0
         ORDER BY created_at DESC
         LIMIT 1`,
        [userId]
      ),

      // NOTES
      pool.query(
        `SELECT id, title, LEFT(COALESCE(content,''), 140) AS preview, modified_at
         FROM notes
         WHERE user_id=$1 AND is_deleted=false AND is_archived=false
         ORDER BY modified_at DESC
         LIMIT 1`,
        [userId]
      ),
      pool.query(
        `SELECT id, title, LEFT(COALESCE(content,''), 140) AS preview, modified_at
         FROM notes
         WHERE user_id=$1 AND is_deleted=false AND is_archived=false
           AND (tags && ARRAY['todo','to-do','task']::text[])
         ORDER BY modified_at DESC
         LIMIT 1`,
        [userId]
      ),

      // CLIPBOARD
      pool.query(
        `SELECT id, COALESCE(description,'') AS description, LEFT(content,140) AS preview, modified_at
         FROM clipboard_items
         WHERE user_id=$1 AND is_deleted=false AND is_pinned=true
         ORDER BY modified_at DESC
         LIMIT 1`,
        [userId]
      ),
      pool.query(
        `SELECT id, COALESCE(description,'') AS description, LEFT(content,140) AS preview, modified_at
         FROM clipboard_items
         WHERE user_id=$1 AND is_deleted=false
         ORDER BY modified_at DESC
         LIMIT 1`,
        [userId]
      ),

      // SCREENSHOTS
      pool.query(
        `SELECT id, web_url, image_url, modified_at
         FROM screenshots
         WHERE user_id=$1 AND is_deleted=false AND is_favorite=true
         ORDER BY modified_at DESC
         LIMIT 1`,
        [userId]
      ),
      pool.query(
        `SELECT id, web_url, image_url, created_at
         FROM screenshots
         WHERE user_id=$1 AND is_deleted=false
         ORDER BY created_at DESC
         LIMIT 1`,
        [userId]
      ),

      // COLORS
      pool.query(
        `SELECT id, hex_code, rgb_code, COALESCE(label,'') AS label, created_at
         FROM saved_colors
         WHERE user_id=$1
         ORDER BY created_at DESC
         LIMIT 1`,
        [userId]
      ),

      // MUSIC
      pool.query(
        `SELECT id, track_name, artist, genre, cover_image, created_at
         FROM music
         WHERE user_id=$1 AND is_deleted=false AND is_favorite=true
         ORDER BY created_at DESC
         LIMIT 1`,
        [userId]
      ),
      pool.query(
        `SELECT id, track_name, artist, genre, cover_image, created_at
         FROM music
         WHERE user_id=$1 AND is_deleted=false
         ORDER BY created_at DESC
         LIMIT 1`,
        [userId]
      ),
    ]);

    res.json({
      bookmarks: {
        mostVisited: mostVisitedBookmark.rows[0] || null,
        savedButUnopened: unopenedBookmark.rows[0] || null,
      },
      notes: {
        recent: recentNote.rows[0] || null,
        todo: todoNote.rows[0] || null,
      },
      clipboard: {
        pinned: pinnedClipboard.rows[0] || null,
        recent: recentClipboard.rows[0] || null,
      },
      screenshots: {
        favorite: favoriteScreenshot.rows[0] || null,
        recent: recentScreenshot.rows[0] || null,
      },
      colors: {
        latest: latestColor.rows[0] || null,
      },
      music: {
        favorite: favoriteMusic.rows[0] || null,
        recent: recentMusic.rows[0] || null,
      },
    });
  } catch (err) {
    console.error("getSuggestions error:", err);
    res.status(500).json({ message: "Error fetching suggestions" });
  }
};
