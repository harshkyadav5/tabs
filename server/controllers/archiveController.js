import pool from "../db/db.js";

export const getArchivedItems = async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await pool.query(
      `SELECT * FROM archive WHERE user_id = $1 ORDER BY archived_at DESC`,
      [userId]
    );

    const archivedItems = [];
    for (const archiveEntry of result.rows) {
      let itemQuery = '';
      let tableName = '';

      switch (archiveEntry.entity_type) {
        case 'bookmark':
          tableName = 'bookmarks';
          break;
        case 'note':
          tableName = 'notes';
          break;
        case 'clipboard':
          tableName = 'clipboard_items';
          break;
        case 'screenshot':
          tableName = 'screenshots';
          break;
        case 'music':
          tableName = 'music';
          break;
        default:
          continue;
      }

      itemQuery = `SELECT * FROM ${tableName} WHERE id = $1 AND user_id = $2`;
      const itemResult = await pool.query(itemQuery, [archiveEntry.entity_id, userId]);
      
      if (itemResult.rows.length > 0) {
        archivedItems.push({
          ...itemResult.rows[0],
          archived_at: archiveEntry.archived_at,
          entity_type: archiveEntry.entity_type
        });
      }
    }

    res.json(archivedItems);
  } catch (error) {
    console.error("Error fetching archived items:", error);
    res.status(500).json({ error: "Failed to fetch archived items" });
  }
};

export const archiveItem = async (req, res) => {
  try {
    const userId = req.user.id;
    const { entity_type, entity_id } = req.body;

    if (!entity_type || !entity_id) {
      return res.status(400).json({ error: "Entity type and entity ID are required" });
    }

    const validTypes = ['bookmark', 'note', 'clipboard', 'screenshot', 'music'];
    if (!validTypes.includes(entity_type)) {
      return res.status(400).json({ error: "Invalid entity type" });
    }

    let tableName = '';
    switch (entity_type) {
      case 'bookmark':
        tableName = 'bookmarks';
        break;
      case 'note':
        tableName = 'notes';
        break;
      case 'clipboard':
        tableName = 'clipboard_items';
        break;
      case 'screenshot':
        tableName = 'screenshots';
        break;
      case 'music':
        tableName = 'music';
        break;
    }

    const itemExists = await pool.query(
      `SELECT id FROM ${tableName} WHERE id = $1 AND user_id = $2`,
      [entity_id, userId]
    );

    if (itemExists.rows.length === 0) {
      return res.status(404).json({ error: "Item not found" });
    }

    const alreadyArchived = await pool.query(
      `SELECT id FROM archive WHERE user_id = $1 AND entity_type = $2 AND entity_id = $3`,
      [userId, entity_type, entity_id]
    );

    if (alreadyArchived.rows.length > 0) {
      return res.status(400).json({ error: "Item is already archived" });
    }

    await pool.query(
      `INSERT INTO archive (user_id, entity_type, entity_id) VALUES ($1, $2, $3)`,
      [userId, entity_type, entity_id]
    );

    await pool.query(
      `UPDATE ${tableName} SET is_archived = true, modified_at = CURRENT_TIMESTAMP WHERE id = $1 AND user_id = $2`,
      [entity_id, userId]
    );

    res.json({ message: "Item archived successfully" });
  } catch (error) {
    console.error("Error archiving item:", error);
    res.status(500).json({ error: "Failed to archive item" });
  }
};

export const unarchiveItem = async (req, res) => {
  try {
    const userId = req.user.id;
    const { entity_type, entity_id } = req.params;

    const result = await pool.query(
      `DELETE FROM archive WHERE user_id = $1 AND entity_type = $2 AND entity_id = $3 RETURNING *`,
      [userId, entity_type, entity_id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Archived item not found" });
    }

    let tableName = '';
    switch (entity_type) {
      case 'bookmark':
        tableName = 'bookmarks';
        break;
      case 'note':
        tableName = 'notes';
        break;
      case 'clipboard':
        tableName = 'clipboard_items';
        break;
      case 'screenshot':
        tableName = 'screenshots';
        break;
      case 'music':
        tableName = 'music';
        break;
      default:
        return res.status(400).json({ error: "Invalid entity type" });
    }

    await pool.query(
      `UPDATE ${tableName} SET is_archived = false, modified_at = CURRENT_TIMESTAMP WHERE id = $1 AND user_id = $2`,
      [entity_id, userId]
    );

    res.json({ message: "Item unarchived successfully" });
  } catch (error) {
    console.error("Error unarchiving item:", error);
    res.status(500).json({ error: "Failed to unarchive item" });
  }
};

export const deleteArchivedItem = async (req, res) => {
  try {
    const userId = req.user.id;
    const { entity_type, entity_id } = req.params;

    const result = await pool.query(
      `DELETE FROM archive WHERE user_id = $1 AND entity_type = $2 AND entity_id = $3 RETURNING *`,
      [userId, entity_type, entity_id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Archived item not found" });
    }

    let tableName = '';
    switch (entity_type) {
      case 'bookmark':
        tableName = 'bookmarks';
        break;
      case 'note':
        tableName = 'notes';
        break;
      case 'clipboard':
        tableName = 'clipboard_items';
        break;
      case 'screenshot':
        tableName = 'screenshots';
        break;
      case 'music':
        tableName = 'music';
        break;
      default:
        return res.status(400).json({ error: "Invalid entity type" });
    }

    await pool.query(
      `DELETE FROM ${tableName} WHERE id = $1 AND user_id = $2`,
      [entity_id, userId]
    );

    res.json({ message: "Item permanently deleted" });
  } catch (error) {
    console.error("Error deleting archived item:", error);
    res.status(500).json({ error: "Failed to delete archived item" });
  }
};
