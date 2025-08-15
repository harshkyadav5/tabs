import express from "express";
import { getMusic, getNewReleases } from "../controllers/musicController.js";

const router = express.Router();

router.get("/search/:query", getMusic);
router.get("/new-releases", getNewReleases);

export default router;
