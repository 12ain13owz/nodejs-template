import { AppConfig } from '@/types/generic.type'

import { loadEnvFile } from './env-loader'
import { validateEnv } from './validate-env'

loadEnvFile()
const env = validateEnv()

export const config: Readonly<AppConfig> = {
  port: env.PORT,
  node_env: env.NODE_ENV,
  baseUrl: env.BASE_URL,
  logLevel: {
    console: env.LOG_LEVEL_CONSOLE,
    file: env.LOG_LEVEL_FILE,
    errorFile: env.LOG_LEVEL_ERROR_FILE,
  },
} as const
