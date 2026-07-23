import pool from "../db/db.js";

export const getClipboardItems = async (req, res) => {
  const userId = req.user.id;
  const { is_archived, is_deleted } = req.query;

  try {
    let query = `SELECT * FROM clipboard_items WHERE user_id = $1`;
    const params = [userId];

    if (is_archived !== undefined) {
      params.push(is_archived === 'true');
      query += ` AND is_archived = $${params.length}`;
    }

    if (is_deleted !== undefined) {
      params.push(is_deleted === 'true');
      query += ` AND is_deleted = $${params.length}`;
    } else {
      query += ` AND is_deleted = FALSE`;
    }

    query += ` ORDER BY is_pinned DESC, modified_at DESC`;

    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching clipboard items:", err);
    res.status(500).json({ error: "Server error" });
  }
};

export const createClipboardItem = async (req, res) => {
  const userId = req.user.id;
  const { description, content, is_pinned = false } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO clipboard_items (user_id, description, content, is_pinned)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [userId, description, content, is_pinned]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error creating item:", err);
    res.status(500).json({ error: "Server error" });
  }
};

export const updateClipboardItem = async (req, res) => {
  const userId = req.user.id;
  const itemId = req.params.id;
  const { description, content, is_pinned } = req.body;

  try {
    const result = await pool.query(
      `UPDATE clipboard_items
       SET description = $1, content = $2, is_pinned = $3, modified_at = NOW()
       WHERE id = $4 AND user_id = $5 RETURNING *`,
      [description, content, is_pinned, itemId, userId]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: "Item not found" });
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error updating item:", err);
    res.status(500).json({ error: "Server error" });
  }
};

export const deleteClipboardItem = async (req, res) => {
  const userId = req.user.id;
  const itemId = req.params.id;

  try {
    const result = await pool.query(
      `UPDATE clipboard_items SET is_deleted = TRUE, modified_at = NOW()
       WHERE id = $1 AND user_id = $2 AND is_deleted = FALSE
       RETURNING *`,
      [itemId, userId]
    );

    if (result.rows.length > 0) {
      await pool.query(
        `INSERT INTO trash_bin (user_id, entity_type, entity_id) VALUES ($1, 'clipboard', $2)`,
        [userId, itemId]
      );
    }

    res.json({ success: true });
  } catch (err) {
    console.error("Error deleting item:", err);
    res.status(500).json({ error: "Server error" });
  }
};
