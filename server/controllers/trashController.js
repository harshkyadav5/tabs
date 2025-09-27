import pool from "../db/db.js";

export const getTrashItems = async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await pool.query(
      `SELECT * FROM trash_bin WHERE user_id = $1 ORDER BY deleted_at DESC`,
      [userId]
    );

    const trashItems = [];
    for (const trashEntry of result.rows) {
      let itemQuery = '';
      let tableName = '';

      switch (trashEntry.entity_type) {
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

      itemQuery = `SELECT * FROM ${tableName} WHERE id = $1 AND user_id = $2 AND is_deleted = true`;
      const itemResult = await pool.query(itemQuery, [trashEntry.entity_id, userId]);
      
      if (itemResult.rows.length > 0) {
        trashItems.push({
          ...itemResult.rows[0],
          deleted_at: trashEntry.deleted_at,
          entity_type: trashEntry.entity_type
        });
      }
    }

    res.json(trashItems);
  } catch (error) {
    console.error("Error fetching trash items:", error);
    res.status(500).json({ error: "Failed to fetch trash items" });
  }
};

export const restoreItem = async (req, res) => {
  try {
    const userId = req.user.id;
    const { entity_type, entity_id } = req.params;

    const result = await pool.query(
      `DELETE FROM trash_bin WHERE user_id = $1 AND entity_type = $2 AND entity_id = $3 RETURNING *`,
      [userId, entity_type, entity_id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Trash item not found" });
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
      `UPDATE ${tableName} SET is_deleted = false, modified_at = CURRENT_TIMESTAMP WHERE id = $1 AND user_id = $2`,
      [entity_id, userId]
    );

    res.json({ message: "Item restored successfully" });
  } catch (error) {
    console.error("Error restoring item:", error);
    res.status(500).json({ error: "Failed to restore item" });
  }
};

export const emptyTrash = async (req, res) => {
  try {
    const userId = req.user.id;

    const trashItems = await pool.query(
      `SELECT * FROM trash_bin WHERE user_id = $1`,
      [userId]
    );

    for (const trashEntry of trashItems.rows) {
      let tableName = '';
      switch (trashEntry.entity_type) {
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

      await pool.query(
        `DELETE FROM ${tableName} WHERE id = $1 AND user_id = $2`,
        [trashEntry.entity_id, userId]
      );
    }

    await pool.query(
      `DELETE FROM trash_bin WHERE user_id = $1`,
      [userId]
    );

    res.json({ message: "Trash emptied successfully" });
  } catch (error) {
    console.error("Error emptying trash:", error);
    res.status(500).json({ error: "Failed to empty trash" });
  }
};

export const deleteTrashItem = async (req, res) => {
  try {
    const userId = req.user.id;
    const { entity_type, entity_id } = req.params;

    const result = await pool.query(
      `DELETE FROM trash_bin WHERE user_id = $1 AND entity_type = $2 AND entity_id = $3 RETURNING *`,
      [userId, entity_type, entity_id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Trash item not found" });
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
    console.error("Error deleting trash item:", error);
    res.status(500).json({ error: "Failed to delete trash item" });
  }
};
