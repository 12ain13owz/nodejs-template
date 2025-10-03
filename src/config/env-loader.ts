/* eslint-disable no-process-env */
import dotenv from 'dotenv'
import { existsSync } from 'node:fs'
import { resolve } from 'node:path'

import { EnvFile, NodeEnv } from '@/const/env/env.const'
import { ERRORS } from '@/const/systems/errors.const'
import { HttpStatus } from '@/const/systems/http-status.const'
import { SUCCESS } from '@/const/systems/success.const'
import { ErrorSeverity } from '@/const/utils/logger.const'
import { AppError, ErrorLogger } from '@/utils/error-handling.utils'
import { logger } from '@/utils/logger.utils'

export function loadEnvFile(): void {
  const nodeEnv = (process.env.NODE_ENV as NodeEnv | undefined) || NodeEnv.DEVELOPMENT
  const envFile = nodeEnv === NodeEnv.PRODUCTION ? EnvFile.PRODUCTION : EnvFile.DEVELOPMENT
  const envPath = resolve(process.cwd(), envFile)

  try {
    if (!existsSync(envPath)) {
      throw new AppError(
        ERRORS.UTIL.notFound(envFile),
        HttpStatus.INTERNAL_SERVER_ERROR,
        ErrorSeverity.ERROR
      ).addOperationName('loadEnvFile')
    }

    dotenv.config({ path: envPath })
    logger.info(SUCCESS.CONFIG.load(envFile))
  } catch (error) {
    if (error instanceof AppError) {
      ErrorLogger.log(error)
      process.exit(1)
    }

    logger.error([ERRORS.CONFIG.load(envFile), error])
    process.exit(1)
  }
}
