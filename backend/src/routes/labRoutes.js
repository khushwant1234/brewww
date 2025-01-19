import { Router } from "express";

import { postLab, getLabs } from "../controllers/labControllers.js";
import { validateToken } from "../middleware/validateToken.js";

const router = Router();

router.post("/", validateToken, postLab);
router.post("/getLabs", validateToken, getLabs);

export default router;
