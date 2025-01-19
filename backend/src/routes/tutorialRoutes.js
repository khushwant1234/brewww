import { Router } from "express";

import { postTutorial, getTutorials } from "../controllers/tutorialControllers.js";
import { validateToken } from "../middleware/validateToken.js";

const router = Router();

router.post("/", validateToken, postTutorial);
router.post("/getTutorials", validateToken, getTutorials);

export default router;
