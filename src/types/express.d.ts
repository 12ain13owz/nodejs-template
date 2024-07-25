import { Response } from "express";
import { InferAttributes } from "sequelize";
import { User } from "../models/user.model";

interface CustomResponseLocals {
  func: string;
}

type AppRes = Response & { locals: CustomResponseLocals };
