import express from "express";
import authenticate from "../middlewares/authenticate.js";
import {
  getTrashItems,
  restoreItem,
  emptyTrash,
  deleteTrashItem
} from "../controllers/trashController.js";

const router = express.Router();

router.get("/", authenticate, getTrashItems);
router.post("/:entity_type/:entity_id/restore", authenticate, restoreItem);
router.delete("/empty", authenticate, emptyTrash);
router.delete("/:entity_type/:entity_id", authenticate, deleteTrashItem);

export default router;
