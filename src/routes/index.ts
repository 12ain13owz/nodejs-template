import { NextFunction, Request, Router } from "express";
import health from "./health.routes";
import { AppRes } from "../types/express";

const router = Router();

router.get("/", (req: Request, res: AppRes, next: NextFunction) => {
  res.json({ message: "Hello World!" });
});
router.use("/health", health);

export default router;
