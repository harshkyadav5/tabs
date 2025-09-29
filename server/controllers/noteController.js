import pool from "../db/db.js";

export const getNotes = async (req, res) => {
  try {
    const userId = req.user.id;
    const { folder_id, search, tag, is_archived, is_deleted } = req.query;

    let query = `
      SELECT n.*, nf.name as folder_name 
      FROM notes n 
      LEFT JOIN note_folders nf ON n.folder_id = nf.id 
      WHERE n.user_id = $1
    `;
    const params = [userId];
    let paramCount = 1;

    if (folder_id) {
      paramCount++;
      query += ` AND n.folder_id = $${paramCount}`;
      params.push(folder_id);
    }

    if (search) {
      paramCount++;
      query += ` AND (n.title ILIKE $${paramCount} OR n.content ILIKE $${paramCount})`;
      params.push(`%${search}%`);
    }

    if (tag) {
      paramCount++;
      query += ` AND n.tags && ARRAY[$${paramCount}]`;
      params.push(tag);
    }

    if (is_archived !== undefined) {
      paramCount++;
      query += ` AND n.is_archived = $${paramCount}`;
      params.push(is_archived === 'true');
    }

    if (is_deleted !== undefined) {
      paramCount++;
      query += ` AND n.is_deleted = $${paramCount}`;
      params.push(is_deleted === 'true');
    }

    query += ` ORDER BY n.is_pinned DESC, n.modified_at DESC`;

    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching notes:", error);
    res.status(500).json({ error: "Failed to fetch notes" });
  }
};

export const createNote = async (req, res) => {
  try {
    const userId = req.user.id;
    const { title, content, folder_id, tags, is_pinned } = req.body;

    if (!title) {
      return res.status(400).json({ error: "Title is required" });
    }

    const result = await pool.query(
      `INSERT INTO notes (user_id, title, content, folder_id, tags, is_pinned)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [userId, title, content, folder_id, tags || [], is_pinned || false]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error creating note:", error);
    res.status(500).json({ error: "Failed to create note" });
  }
};

export const updateNote = async (req, res) => {
  try {
    const userId = req.user.id;
    const noteId = req.params.id;
    const { title, content, folder_id, tags, is_pinned, is_archived } = req.body;

    const result = await pool.query(
      `UPDATE notes 
       SET title = COALESCE($1, title), 
           content = COALESCE($2, content), 
           folder_id = $3,
           tags = COALESCE($4, tags),
           is_pinned = COALESCE($5, is_pinned),
           is_archived = COALESCE($6, is_archived),
           modified_at = CURRENT_TIMESTAMP
       WHERE id = $7 AND user_id = $8
       RETURNING *`,
      [title, content, folder_id, tags, is_pinned, is_archived, noteId, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Note not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error updating note:", error);
    res.status(500).json({ error: "Failed to update note" });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const userId = req.user.id;
    const noteId = req.params.id;

    const result = await pool.query(
      `UPDATE notes 
       SET is_deleted = true, modified_at = CURRENT_TIMESTAMP
       WHERE id = $1 AND user_id = $2
       RETURNING *`,
      [noteId, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Note not found" });
    }

    res.json({ message: "Note deleted successfully" });
  } catch (error) {
    console.error("Error deleting note:", error);
    res.status(500).json({ error: "Failed to delete note" });
  }
};

export const getNoteFolders = async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await pool.query(
      `SELECT * FROM note_folders WHERE user_id = $1 ORDER BY name`,
      [userId]
    );

    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching note folders:", error);
    res.status(500).json({ error: "Failed to fetch note folders" });
  }
};

export const createNoteFolder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Folder name is required" });
    }

    const result = await pool.query(
      `INSERT INTO note_folders (user_id, name) VALUES ($1, $2) RETURNING *`,
      [userId, name]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error creating note folder:", error);
    res.status(500).json({ error: "Failed to create note folder" });
  }
};

export const updateNoteFolder = async (req, res) => {
  try {
    const userId = req.user.id;
    const folderId = req.params.id;
    const { name } = req.body;

    const result = await pool.query(
      `UPDATE note_folders 
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
    console.error("Error updating note folder:", error);
    res.status(500).json({ error: "Failed to update note folder" });
  }
};

export const deleteNoteFolder = async (req, res) => {
  try {
    const userId = req.user.id;
    const folderId = req.params.id;

    await pool.query(
      `UPDATE notes SET folder_id = NULL WHERE folder_id = $1 AND user_id = $2`,
      [folderId, userId]
    );

    const result = await pool.query(
      `DELETE FROM note_folders WHERE id = $1 AND user_id = $2 RETURNING *`,
      [folderId, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Folder not found" });
    }

    res.json({ message: "Folder deleted successfully" });
  } catch (error) {
    console.error("Error deleting note folder:", error);
    res.status(500).json({ error: "Failed to delete note folder" });
  }
};

export const getNoteTags = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT * FROM note_tags ORDER BY name`
    );

    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching note tags:", error);
    res.status(500).json({ error: "Failed to fetch note tags" });
  }
};

export const createNoteTag = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Tag name is required" });
    }

    const result = await pool.query(
      `INSERT INTO note_tags (name) VALUES ($1) RETURNING *`,
      [name]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error creating note tag:", error);
    res.status(500).json({ error: "Failed to create note tag" });
  }
};

export const deleteNoteTag = async (req, res) => {
  try {
    const tagId = req.params.id;

    await pool.query(
      `UPDATE notes SET tags = array_remove(tags, (SELECT name FROM note_tags WHERE id = $1))`,
      [tagId]
    );

    const result = await pool.query(
      `DELETE FROM note_tags WHERE id = $1 RETURNING *`,
      [tagId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Tag not found" });
    }

    res.json({ message: "Tag deleted successfully" });
  } catch (error) {
    console.error("Error deleting note tag:", error);
    res.status(500).json({ error: "Failed to delete note tag" });
  }
};
