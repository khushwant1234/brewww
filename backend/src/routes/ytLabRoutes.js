import Router from "express";
import { getYt } from "../middleware/extractTopic.js";

const router = Router();

router.post("/", getYt);

export default router;
