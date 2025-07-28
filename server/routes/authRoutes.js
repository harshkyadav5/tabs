import express from "express";
import { signup, signin, checkAvailability } from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signup);

router.post("/signin", signin);

router.post("/check-availability", checkAvailability);

export default router;
