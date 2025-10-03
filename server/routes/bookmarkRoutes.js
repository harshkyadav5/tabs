import express from "express";
import authenticate from "../middlewares/authenticate.js";
import {
  getBookmarks,
  createBookmark,
  updateBookmark,
  deleteBookmark,
  getBookmarkFolders,
  createBookmarkFolder,
  updateBookmarkFolder,
  deleteBookmarkFolder,
  incrementViewCount
} from "../controllers/bookmarkController.js";

const router = express.Router();

// Bookmark routes
router.get("/", authenticate, getBookmarks);
router.post("/", authenticate, createBookmark);
router.put("/:id", authenticate, updateBookmark);
router.delete("/:id", authenticate, deleteBookmark);
router.patch("/:id/view", authenticate, incrementViewCount);

// Folder routes
router.get("/folders", authenticate, getBookmarkFolders);
router.post("/folders", authenticate, createBookmarkFolder);
router.put("/folders/:id", authenticate, updateBookmarkFolder);
router.delete("/folders/:id", authenticate, deleteBookmarkFolder);

export default router;
