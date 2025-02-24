import { AppConfig } from "./type";

export const developmentConfig: AppConfig = {
  port: Number(process.env.PORT),
  node_env: String(process.env.NODE_ENV),
};

export type ConfigKey = keyof AppConfig;
