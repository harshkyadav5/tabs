import express from "express";
import { getSuggestions } from "../controllers/suggestionsController.js";
import authenticate from "../middlewares/authenticate.js";

const router = express.Router();

router.get("/", authenticate, getSuggestions);

export default router;
