import pool from "../db/db.js";

export const getScreenshots = async (req, res) => {
  try {
    const userId = req.user.id;
    const { is_favorite, is_deleted } = req.query;

    let query = `SELECT * FROM screenshots WHERE user_id = $1`;
    const params = [userId];
    let paramCount = 1;

    if (is_favorite !== undefined) {
      paramCount++;
      query += ` AND is_favorite = $${paramCount}`;
      params.push(is_favorite === 'true');
    }

    if (is_deleted !== undefined) {
      paramCount++;
      query += ` AND is_deleted = $${paramCount}`;
      params.push(is_deleted === 'true');
    }

    query += ` ORDER BY created_at DESC`;

    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching screenshots:", error);
    res.status(500).json({ error: "Failed to fetch screenshots" });
  }
};

export const createScreenshot = async (req, res) => {
  try {
    const userId = req.user.id;
    const { web_url, image_url } = req.body;

    if (!web_url || !image_url) {
      return res.status(400).json({ error: "Web URL and image URL are required" });
    }

    const result = await pool.query(
      `INSERT INTO screenshots (user_id, web_url, image_url)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [userId, web_url, image_url]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error creating screenshot:", error);
    res.status(500).json({ error: "Failed to create screenshot" });
  }
};

export const updateScreenshot = async (req, res) => {
  try {
    const userId = req.user.id;
    const screenshotId = req.params.id;
    const { web_url, image_url, is_favorite } = req.body;

    const result = await pool.query(
      `UPDATE screenshots 
       SET web_url = COALESCE($1, web_url), 
           image_url = COALESCE($2, image_url),
           is_favorite = COALESCE($3, is_favorite),
           modified_at = CURRENT_TIMESTAMP
       WHERE id = $4 AND user_id = $5
       RETURNING *`,
      [web_url, image_url, is_favorite, screenshotId, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Screenshot not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error updating screenshot:", error);
    res.status(500).json({ error: "Failed to update screenshot" });
  }
};

export const deleteScreenshot = async (req, res) => {
  try {
    const userId = req.user.id;
    const screenshotId = req.params.id;

    const result = await pool.query(
      `UPDATE screenshots 
       SET is_deleted = true, modified_at = CURRENT_TIMESTAMP
       WHERE id = $1 AND user_id = $2
       RETURNING *`,
      [screenshotId, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Screenshot not found" });
    }

    res.json({ message: "Screenshot deleted successfully" });
  } catch (error) {
    console.error("Error deleting screenshot:", error);
    res.status(500).json({ error: "Failed to delete screenshot" });
  }
};

export const toggleFavorite = async (req, res) => {
  try {
    const userId = req.user.id;
    const screenshotId = req.params.id;

    const result = await pool.query(
      `UPDATE screenshots 
       SET is_favorite = NOT is_favorite, modified_at = CURRENT_TIMESTAMP
       WHERE id = $1 AND user_id = $2
       RETURNING *`,
      [screenshotId, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Screenshot not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error toggling favorite:", error);
    res.status(500).json({ error: "Failed to toggle favorite" });
  }
};
