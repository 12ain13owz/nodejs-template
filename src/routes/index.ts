import { Router } from "express";
import health from "./health.routes";

const router = Router();
router.use("/health", health);

export default router;
