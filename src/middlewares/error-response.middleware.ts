import { NextFunction, Request, Response } from 'express'

import { config } from '@/config'
import { NodeEnv } from '@/const/env/env.const'
import { ERRORS } from '@/const/systems/errors.const'
import { HttpStatus } from '@/const/systems/http-status.const'
import { AppError, ErrorLogger } from '@/utils/error-handling.utils'
import { createResponse } from '@/utils/generic.utils'
import { logger } from '@/utils/logger.utils'

export const errorHandler = async (
  error: AppError | Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> => {
  try {
    ErrorLogger.log(error)

    const status = error instanceof AppError ? error.status : HttpStatus.INTERNAL_SERVER_ERROR
    const message = error.message ? error.message : ERRORS.SYSTEM.INTERNAL_SERVER_ERROR
    const data = config.node_env === NodeEnv.DEVELOPMENT ? error : undefined
    const response = createResponse(message, data)

    res.status(status).json(response)
  } catch (error) {
    logger.error(error)
    const data = config.node_env === NodeEnv.DEVELOPMENT ? error : undefined
    const response = createResponse(ERRORS.SYSTEM.INTERNAL_SERVER_ERROR, data)

    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(response)
  }
}
