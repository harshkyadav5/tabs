import express from "express";
import authenticate from "../middlewares/authenticate.js";
import { getSearchStats, getSearchSuggestions, searchAll } from "../controllers/searchController.js";

const router = express.Router();

router.get("/stats", authenticate, getSearchStats);
router.get("/suggestions", authenticate, getSearchSuggestions);
router.post("/", authenticate, searchAll);

export default router;
