import express from "express";
import authenticate from "../middlewares/authenticate.js";
import {
  getArchivedItems,
  archiveItem,
  unarchiveItem,
  deleteArchivedItem
} from "../controllers/archiveController.js";

const router = express.Router();

router.get("/", authenticate, getArchivedItems);
router.post("/", authenticate, archiveItem);
router.delete("/:entityType/:entityId", authenticate, unarchiveItem);
router.delete("/:entityType/:entityId/permanent", authenticate, deleteArchivedItem);

export default router;
