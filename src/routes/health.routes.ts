import { NextFunction, Request, Router } from "express";
import { newError } from "../utils/helper";
import { AppRes } from "../types/express";

const router = Router();

router.get("/", (req: Request, res: AppRes, next: NextFunction) => {
  try {
    res.json({ meeeage: " ok" });
  } catch (error) {
    next(error);
  }
});

router.get("/error", (req: Request, res: AppRes, next: NextFunction) => {
  res.locals.func = "Routes > Health > Error";

  try {
    throw newError(400, "Test message error!");
  } catch (error) {
    next(error);
  }
});

export default router;
