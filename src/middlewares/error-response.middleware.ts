import { NextFunction, Request, Response } from 'express'

import { getConfig } from '@/config'
import { envConst } from '@/constants/env.const'
import { messageConst } from '@/constants/message.const'
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
        messageConst.internalErrors.UNKNOWN_FUNCTION,
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
      error:
        getConfig('node_env') === envConst.DEVELOPMENT ? errorLog : undefined,
    }

    res.status(response.status).json({ message: response.message })
  } catch (error) {
    logger.error(error)
    res
      .status(500)
      .json({ message: messageConst.httpErrors.INTERNAL_SERVER_ERROR })
  }
}
