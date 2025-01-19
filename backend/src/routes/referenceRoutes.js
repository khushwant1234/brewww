import { Router } from "express";
import { getReference } from "../middleware/extractWords.js";

const router = Router();

router.post("/", getReference);

export default router;
