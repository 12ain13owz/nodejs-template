import { NextFunction, Request, Response } from 'express'

import { messageConst } from '@/constants/message.const'
import { AppError } from '@/utils/error-handling.util'

const success = (_req: Request, res: Response, next: NextFunction): void => {
  try {
    res.json({
      message: messageConst.success.OK,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    next(error)
  }
}

const error = (_req: Request, _res: Response, next: NextFunction): void => {
  try {
    throw new AppError('Test error function', 400, 'LOW', {
      functionName: 'healthController.error',
      additionalData: {
        userId: 1,
        name: 'John Doe',
        active: false,
        items: ['1', 2, true, null, undefined, new Date()],
        description: null,
        email: undefined,
        createdAt: new Date(),
      },
    })
  } catch (error) {
    next(error)
  }
}

export const healthController = {
  success,
  error,
}
