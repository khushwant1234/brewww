import Router from "express";
import { chatBot } from "../controllers/chatBotControllers.js";

const router = Router();

router.post("/", chatBot);

export default router;
