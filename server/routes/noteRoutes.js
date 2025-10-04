import express from "express";
import authenticate from "../middlewares/authenticate.js";
import {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
  getNoteFolders,
  createNoteFolder,
  updateNoteFolder,
  deleteNoteFolder,
  getNoteTags,
  createNoteTag,
  deleteNoteTag
} from "../controllers/noteController.js";

const router = express.Router();

// Note routes
router.get("/", authenticate, getNotes);
router.post("/", authenticate, createNote);
router.put("/:id", authenticate, updateNote);
router.delete("/:id", authenticate, deleteNote);

// Folder routes
router.get("/folders", authenticate, getNoteFolders);
router.post("/folders", authenticate, createNoteFolder);
router.put("/folders/:id", authenticate, updateNoteFolder);
router.delete("/folders/:id", authenticate, deleteNoteFolder);

// Tag routes
router.get("/tags", authenticate, getNoteTags);
router.post("/tags", authenticate, createNoteTag);
router.delete("/tags/:id", authenticate, deleteNoteTag);

export default router;
