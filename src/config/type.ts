export interface AppConfig {
  port: number;
  node_env: string;
}

export type ConfigKey = keyof AppConfig;
