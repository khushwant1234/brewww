import { Router } from "express";
import { test } from "../middleware/extractWords.js";

const router = Router();

router.get("/", test);  // Simplified route definition

export default router;
