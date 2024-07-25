import { NextFunction, Request, Response, Router } from "express";
import { newError } from "../utils/helper";

const router = Router();

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.json({ meeeage: " ok" });
});

router.get("/error", (req: Request, res: Response, next: NextFunction) => {
  res.locals.func = "Routes > Health > Error";

  try {
    throw newError(400, "Test message error!");
  } catch (error) {
    next(error);
  }
});

export default router;
