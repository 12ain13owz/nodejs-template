import { NextFunction, Request, Response } from 'express'

import { getConfig } from '@/config'
import { NODE_ENV } from '@/constants/env.constant'
import { HTTP_ERRORS, INTERNAL_ERRORS } from '@/constants/message.constant'
import { AppError, ErrorLogger } from '@/utils/error-handling.util'
import { logger } from '@/utils/logger.util'

export const errorHandler = async (
  error: AppError | Error,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  try {
    if (error instanceof AppError) error.addRequestContext(req)

    const errorLog = ErrorLogger.log(error, {
      functionName:
        (error as AppError).context?.functionName ||
        INTERNAL_ERRORS.UNKNOWN_FUNCTION,
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

    const response = {
      status: error instanceof AppError ? error.status : 500,
      message: error.message,
      timestamp: new Date().toISOString(),
      ...(getConfig('node_env') === NODE_ENV.DEVELOPMENT && {
        details: errorLog,
      }),
    }

    res.status(response.status).json(response)
  } catch (error) {
    logger.error(error)
    res.status(500).json({
      status: 500,
      message: HTTP_ERRORS.INTERNAL_SERVER_ERROR,
      timestamp: new Date().toISOString(),
    })
  }
}
