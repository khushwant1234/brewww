import Router from "express";
import { chatBot } from "../controllers/chatBotControllers.js";
import { validateToken } from "../middleware/validateToken.js";

const router = Router();

router.post("/", chatBot);

export default router;
