import { NextFunction, Request, Router } from "express";
import { AppRes } from "../types/express";
import { appError } from "../middlewares/app-error.middleware";

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
    throw appError(400, "Test message error!");
  } catch (error) {
    next(error);
  }
});

export default router;
