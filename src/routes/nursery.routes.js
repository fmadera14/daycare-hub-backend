import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { nurseryController } from "../controllers/nursery.controller.js";

const router = Router();

router.get("/", authMiddleware, nurseryController.listNurseries);

export default router;
