/* eslint-disable no-process-env */
/* eslint-disable security/detect-object-injection */
import dotenv from 'dotenv'
import fs from 'fs'
import { z, ZodError } from 'zod'

import { envConst } from '@/constants/env.const'
import { AppConfig } from '@/types/config.type'
import { AppError, ErrorLogger } from '@/utils/error-handling.util'

// Load environment variables from the appropriate .env file
const loadEnvFile = (): void => {
  const nodeEnv =
    process.env.NODE_ENV === envConst.PRODUCTION
      ? envConst.ENV_PRODUCTION
      : envConst.ENV_DEVELOPMENT

  try {
    if (!fs.existsSync(nodeEnv))
      throw new AppError(`Could not find ${nodeEnv}`, 500, 'CRITICAL', {
        functionName: 'loadEnvFile',
      })

    dotenv.config({ path: nodeEnv })
  } catch (error) {
    if (error instanceof AppError) ErrorLogger.log(error)
    process.exit(1)
  }
}

// Define and validate the environment schema
const validateEnv = () => {
  try {
    const envSchema = z.object({
      PORT: z
        .string()
        .optional()
        .transform((val) => Number(val))
        .pipe(z.number().int().positive()),
      NODE_ENV: z.enum([envConst.DEVELOPMENT, envConst.PRODUCTION]),
    })

    return envSchema.parse(process.env)
  } catch (error) {
    const err = new AppError(
      error instanceof ZodError ? error.message : 'Unknown error',
      500,
      'CRITICAL',
      { functionName: 'validateEnv' }
    )
    ErrorLogger.log(err)
    process.exit(1)
  }
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
