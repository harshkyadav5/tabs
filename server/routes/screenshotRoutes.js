import express from "express";
import authenticate from "../middlewares/authenticate.js";
import {
  getScreenshots,
  createScreenshot,
  updateScreenshot,
  deleteScreenshot,
  toggleFavorite
} from "../controllers/screenshotController.js";

const router = express.Router();

router.get("/", authenticate, getScreenshots);
router.post("/", authenticate, createScreenshot);
router.put("/:id", authenticate, updateScreenshot);
router.delete("/:id", authenticate, deleteScreenshot);
router.patch("/:id/favorite", authenticate, toggleFavorite);

export default router;
