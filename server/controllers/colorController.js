import pool from "../db/db.js";

export const getSavedColors = async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await pool.query(
      `SELECT * FROM saved_colors WHERE user_id = $1 ORDER BY created_at DESC`,
      [userId]
    );

    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching saved colors:", error);
    res.status(500).json({ error: "Failed to fetch saved colors" });
  }
};

export const createSavedColor = async (req, res) => {
  try {
    const userId = req.user.id;
    const { hex_code, rgb_code, label } = req.body;

    if (!hex_code || !rgb_code) {
      return res.status(400).json({ error: "Hex code and RGB code are required" });
    }

    if (!/^#[0-9A-F]{6}$/i.test(hex_code)) {
      return res.status(400).json({ error: "Invalid hex code format" });
    }

    const result = await pool.query(
      `INSERT INTO saved_colors (user_id, hex_code, rgb_code, label)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [userId, hex_code, rgb_code, label]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error creating saved color:", error);
    res.status(500).json({ error: "Failed to create saved color" });
  }
};

export const updateSavedColor = async (req, res) => {
  try {
    const userId = req.user.id;
    const colorId = req.params.id;
    const { hex_code, rgb_code, label } = req.body;

    if (hex_code && !/^#[0-9A-F]{6}$/i.test(hex_code)) {
      return res.status(400).json({ error: "Invalid hex code format" });
    }

    const result = await pool.query(
      `UPDATE saved_colors 
       SET hex_code = COALESCE($1, hex_code), 
           rgb_code = COALESCE($2, rgb_code),
           label = COALESCE($3, label),
           modified_at = CURRENT_TIMESTAMP
       WHERE id = $4 AND user_id = $5
       RETURNING *`,
      [hex_code, rgb_code, label, colorId, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Saved color not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error updating saved color:", error);
    res.status(500).json({ error: "Failed to update saved color" });
  }
};

export const deleteSavedColor = async (req, res) => {
  try {
    const userId = req.user.id;
    const colorId = req.params.id;

    const result = await pool.query(
      `DELETE FROM saved_colors WHERE id = $1 AND user_id = $2 RETURNING *`,
      [colorId, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Saved color not found" });
    }

    res.json({ message: "Saved color deleted successfully" });
  } catch (error) {
    console.error("Error deleting saved color:", error);
    res.status(500).json({ error: "Failed to delete saved color" });
  }
};
