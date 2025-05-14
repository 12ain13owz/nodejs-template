/* eslint-disable no-process-env */
/* eslint-disable security/detect-object-injection */
import dotenv from 'dotenv'
import { z } from 'zod'

import { environment } from '@/constants/environment.const'
import { AppConfig } from '@/types/config.type'

// Load environment variables from the appropriate .env file
const loadEnvFile = (): void => {
  const nodeEnv =
    process.env.NODE_ENV === environment.PRODUCTION
      ? environment.ENV_PRODUCTION
      : environment.ENV_DEVELOPMENT

  dotenv.config({ path: nodeEnv })
}

// Define and validate the environment schema
const validateEnv = () => {
  const envSchema = z.object({
    PORT: z
      .string()
      .optional()
      .transform((val) => Number(val))
      .pipe(z.number().int().positive())
      .default('3000'),
    NODE_ENV: z
      .enum([environment.DEVELOPMENT, environment.PRODUCTION])
      .default(environment.DEVELOPMENT),
  })

  return envSchema.parse(process.env)
}

// Initialize the configuration
loadEnvFile()
const env = validateEnv()

// Create and freeze the config object
const config: Readonly<AppConfig> = Object.freeze({
  port: env.PORT,
  node_env: env.NODE_ENV as AppConfig['node_env'],
})

export function getConfig<K extends keyof AppConfig>(key: K): AppConfig[K] {
  return config[key]
}
