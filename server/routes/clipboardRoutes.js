import express from "express";
import authenticate from "../middlewares/authenticate.js";
import {
  getClipboardItems,
  createClipboardItem,
  updateClipboardItem,
  deleteClipboardItem,
} from "../controllers/clipboardController.js";

const router = express.Router();

router.get("/", authenticate, getClipboardItems);
router.post("/", authenticate, createClipboardItem);
router.put("/:id", authenticate, updateClipboardItem);
router.delete("/:id", authenticate, deleteClipboardItem);

export default router;
