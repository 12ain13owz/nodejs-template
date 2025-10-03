import { ERRORS } from '@/const/systems/errors.const'
import { HttpStatus } from '@/const/systems/http-status.const'
import { ErrorSeverity } from '@/const/utils/logger.const'
import { AppError, ErrorLogger } from '@/utils/error-handling.utils'

import { envSchema, EnvSchema } from './env.schema'

export function validateEnv(): EnvSchema {
  try {
    return envSchema.parse(process.env)
  } catch (error) {
    const err = new AppError(
      error instanceof Error ? error.message : ERRORS.SYSTEM.INTERNAL_SERVER_ERROR,
      HttpStatus.INTERNAL_SERVER_ERROR,
      ErrorSeverity.ERROR
    ).addOperationName('validateEnv')

    ErrorLogger.log(err)
    process.exit(1)
  }
}
