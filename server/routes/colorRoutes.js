import express from "express";
import authenticate from "../middlewares/authenticate.js";
import {
  getSavedColors,
  createSavedColor,
  updateSavedColor,
  deleteSavedColor
} from "../controllers/colorController.js";

const router = express.Router();

router.get("/", authenticate, getSavedColors);
router.post("/", authenticate, createSavedColor);
router.put("/:id", authenticate, updateSavedColor);
router.delete("/:id", authenticate, deleteSavedColor);

export default router;
