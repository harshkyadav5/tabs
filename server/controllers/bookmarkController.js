import pool from "../db/db.js";

export const getBookmarks = async (req, res) => {
  try {
    const userId = req.user.id;
    const { folder_id, search, is_archived, is_deleted } = req.query;

    let query = `
      SELECT b.*, bf.name as folder_name 
      FROM bookmarks b 
      LEFT JOIN bookmark_folders bf ON b.folder_id = bf.id 
      WHERE b.user_id = $1
    `;
    const params = [userId];
    let paramCount = 1;

    if (folder_id) {
      paramCount++;
      query += ` AND b.folder_id = $${paramCount}`;
      params.push(folder_id);
    }

    if (search) {
      paramCount++;
      query += ` AND (b.title ILIKE $${paramCount} OR b.url ILIKE $${paramCount} OR b.description ILIKE $${paramCount})`;
      params.push(`%${search}%`);
    }

    if (is_archived !== undefined) {
      paramCount++;
      query += ` AND b.is_archived = $${paramCount}`;
      params.push(is_archived === 'true');
    }

    if (is_deleted !== undefined) {
      paramCount++;
      query += ` AND b.is_deleted = $${paramCount}`;
      params.push(is_deleted === 'true');
    }

    query += ` ORDER BY b.is_pinned DESC, b.modified_at DESC`;

    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching bookmarks:", error);
    res.status(500).json({ error: "Failed to fetch bookmarks" });
  }
};

export const createBookmark = async (req, res) => {
  try {
    const userId = req.user.id;
    const { url, title, description, folder_id, is_pinned } = req.body;

    if (!url) {
      return res.status(400).json({ error: "URL is required" });
    }

    const result = await pool.query(
      `INSERT INTO bookmarks (user_id, url, title, description, folder_id, is_pinned)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [userId, url, title, description, folder_id, is_pinned || false]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error creating bookmark:", error);
    res.status(500).json({ error: "Failed to create bookmark" });
  }
};

export const updateBookmark = async (req, res) => {
  try {
    const userId = req.user.id;
    const bookmarkId = req.params.id;
    const { url, title, description, folder_id, is_pinned, is_archived } = req.body;

    const result = await pool.query(
      `UPDATE bookmarks 
       SET url = COALESCE($1, url), 
           title = COALESCE($2, title), 
           description = COALESCE($3, description),
           folder_id = $4,
           is_pinned = COALESCE($5, is_pinned),
           is_archived = COALESCE($6, is_archived),
           modified_at = CURRENT_TIMESTAMP
       WHERE id = $7 AND user_id = $8
       RETURNING *`,
      [url, title, description, folder_id, is_pinned, is_archived, bookmarkId, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Bookmark not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error updating bookmark:", error);
    res.status(500).json({ error: "Failed to update bookmark" });
  }
};

export const deleteBookmark = async (req, res) => {
  try {
    const userId = req.user.id;
    const bookmarkId = req.params.id;

    const result = await pool.query(
      `UPDATE bookmarks 
       SET is_deleted = true, modified_at = CURRENT_TIMESTAMP
       WHERE id = $1 AND user_id = $2
       RETURNING *`,
      [bookmarkId, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Bookmark not found" });
    }

    res.json({ message: "Bookmark deleted successfully" });
  } catch (error) {
    console.error("Error deleting bookmark:", error);
    res.status(500).json({ error: "Failed to delete bookmark" });
  }
};

export const incrementViewCount = async (req, res) => {
  try {
    const userId = req.user.id;
    const bookmarkId = req.params.id;

    const result = await pool.query(
      `UPDATE bookmarks 
       SET view_count = COALESCE(view_count, 0) + 1, 
           modified_at = CURRENT_TIMESTAMP
       WHERE id = $1 AND user_id = $2
       RETURNING *`,
      [bookmarkId, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Bookmark not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error incrementing view count:", error);
    res.status(500).json({ error: "Failed to increment view count" });
  }
};

export const getBookmarkFolders = async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await pool.query(
      `SELECT * FROM bookmark_folders WHERE user_id = $1 ORDER BY name`,
      [userId]
    );

    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching bookmark folders:", error);
    res.status(500).json({ error: "Failed to fetch bookmark folders" });
  }
};

export const createBookmarkFolder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Folder name is required" });
    }

    const result = await pool.query(
      `INSERT INTO bookmark_folders (user_id, name) VALUES ($1, $2) RETURNING *`,
      [userId, name]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error creating bookmark folder:", error);
    res.status(500).json({ error: "Failed to create bookmark folder" });
  }
};

export const updateBookmarkFolder = async (req, res) => {
  try {
    const userId = req.user.id;
    const folderId = req.params.id;
    const { name } = req.body;

    const result = await pool.query(
      `UPDATE bookmark_folders 
       SET name = $1 
       WHERE id = $2 AND user_id = $3
       RETURNING *`,
      [name, folderId, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Folder not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error updating bookmark folder:", error);
    res.status(500).json({ error: "Failed to update bookmark folder" });
  }
};

export const deleteBookmarkFolder = async (req, res) => {
  try {
    const userId = req.user.id;
    const folderId = req.params.id;

    await pool.query(
      `UPDATE bookmarks SET folder_id = NULL WHERE folder_id = $1 AND user_id = $2`,
      [folderId, userId]
    );

    const result = await pool.query(
      `DELETE FROM bookmark_folders WHERE id = $1 AND user_id = $2 RETURNING *`,
      [folderId, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Folder not found" });
    }

    res.json({ message: "Folder deleted successfully" });
  } catch (error) {
    console.error("Error deleting bookmark folder:", error);
    res.status(500).json({ error: "Failed to delete bookmark folder" });
  }
};
