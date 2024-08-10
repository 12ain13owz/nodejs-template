export interface AppConfig {
  port: number;
}

export type ConfigKey = keyof AppConfig;
