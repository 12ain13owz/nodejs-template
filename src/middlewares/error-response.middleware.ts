import { NextFunction, Request, Response } from 'express'

import { config } from '@/config'
import { NodeEnv } from '@/constants/env.constant'
import { HttpStatus, InternalError, MESSAGES } from '@/constants/message.constant'
import { AppError, ErrorLogger } from '@/utils/error-handling.utils'
import { logger } from '@/utils/logger.utils'
import { createResponse } from '@/utils/response.utils'

export const errorHandler = async (
  error: AppError | Error,
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> => {
  try {
    if (error instanceof AppError) error.addRequestContext(req)
    const errorLog = ErrorLogger.log(error, {
      functionName: (error as AppError).context?.functionName || InternalError.UNKNOWN_FUNCTION,
      requestContext: {
        method: req.method,
        url: req.url,
        baseUrl: req.baseUrl,
        path: req.path,
        body: req.body as Record<string, unknown>,
        params: req.params,
        query: req.query,
      },
    })

    const status = errorLog.status ? errorLog.status : HttpStatus.INTERNAL_SERVER_ERROR
    const message = errorLog.message ? errorLog.message : MESSAGES.ERROR.INTERNAL_SERVER_ERROR
    const detail = config.node_env === NodeEnv.DEVELOPMENT ? errorLog : undefined
    const response = createResponse(message, detail)

    res.status(status).json(response)
  } catch (error) {
    logger.error(error)
    const detail = config.node_env === NodeEnv.DEVELOPMENT ? error : undefined
    const response = createResponse(MESSAGES.ERROR.INTERNAL_SERVER_ERROR, detail)

    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(response)
  }
}
