import { AppConfig } from "./type";

export const productionConfig: AppConfig = {
  port: Number(process.env.PORT),
};

export type ConfigKey = keyof AppConfig;
