import { NextFunction, Request, Response } from "express";
import log from "../utils/logger";

interface ResponseError extends Error {
  status?: number;
}

const errorHandler = async (
  error: ResponseError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const message = error.message || "Internal Server Error!";
    const status = error.status ?? 500;
    const func = res.locals.func || "Not found function";
    const method = req.method;
    const url = req.baseUrl + req.url;

    log.error(`${method}: ${url} > ${func}: ${message}`);
    res.status(status).json({ message });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export default errorHandler;
