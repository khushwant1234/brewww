import Router from "express";
import { geminiCall } from "../controllers/geminiPromptController.js";

const router = Router();

router.post("/", geminiCall);

export default router;
