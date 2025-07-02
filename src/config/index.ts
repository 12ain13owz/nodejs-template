/* eslint-disable no-process-env */
/* eslint-disable security/detect-object-injection */
import dotenv from 'dotenv'
import fs from 'fs'
import { z, ZodError } from 'zod'

import { EnvFile, NodeEnv } from '@/constants/env.constant'
import { ErrorSeverity } from '@/constants/logger.constant'
import {
  HttpStatus,
  InternalError,
  MESSAGES,
} from '@/constants/message.constant'
import { AppConfig } from '@/types/config.type'
import { AppError, ErrorLogger } from '@/utils/error-handling.util'

// Load environment variables from the appropriate .env file
function loadEnvFile(): void {
  const envFile =
    process.env.NODE_ENV === NodeEnv.PRODUCTION
      ? EnvFile.PRODUCTION
      : EnvFile.DEVELOPMENT

  try {
    if (!fs.existsSync(envFile))
      throw new AppError(
        MESSAGES.ERROR.notFoundEnvFile(envFile),
        HttpStatus.INTERNAL_SERVER_ERROR,
        ErrorSeverity.CRITICAL,
        { functionName: 'loadEnvFile' }
      )

    dotenv.config({ path: envFile })
  } catch (error) {
    if (error instanceof AppError) {
      ErrorLogger.log(error)
      process.exit(1)
    }

    console.error(error)
    process.exit(1)
  }
}

// Define environment schema
function envSchema() {
  return z.object({
    PORT: z
      .string()
      .optional()
      .transform((val) => Number(val))
      .pipe(z.number().int().positive()),
    NODE_ENV: z.enum([NodeEnv.DEVELOPMENT, NodeEnv.PRODUCTION]),
  })
}

// Validate environment schema
function validateEnv() {
  try {
    return envSchema().parse(process.env)
  } catch (error) {
    const err = new AppError(
      error instanceof ZodError ? error.message : InternalError.UNKNOWN_ERROR,
      HttpStatus.INTERNAL_SERVER_ERROR,
      ErrorSeverity.CRITICAL,
      { functionName: 'validateEnv' }
    )
    ErrorLogger.log(err)
    process.exit(1)
  }
}

// Initialize configuration
loadEnvFile()
const env = validateEnv()

// Create and freeze config object
const config: Readonly<AppConfig> = {
  port: env.PORT,
  node_env: env.NODE_ENV,
} as const

export function getConfig<K extends keyof AppConfig>(key: K): AppConfig[K] {
  return config[key]
}
