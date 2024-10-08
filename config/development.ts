import { AppConfig } from "./type";

export const developmentConfig: AppConfig = {
  port: Number(process.env.PORT),
};

export type ConfigKey = keyof AppConfig;
