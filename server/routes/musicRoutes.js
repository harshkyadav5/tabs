import express from "express";
import { getMusic } from "../controllers/musicController.js";

const router = express.Router();

router.get("/", getMusic);

export default router;
