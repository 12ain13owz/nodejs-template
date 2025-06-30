import { NextFunction, Request, Response } from 'express'

import { MESSAGES } from '@/constants/message.constant'
import { AppError } from '@/utils/error-handling.util'

export const healthSuccessController = (
  _req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    res.json({
      message: MESSAGES.SUCCESS.OK,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    next(error)
  }
}

export const healthErrorController = (
  _req: Request,
  _res: Response,
  next: NextFunction
): void => {
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
