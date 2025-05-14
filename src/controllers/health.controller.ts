import { NextFunction, Request, Response } from 'express'

import { appMessage } from '@/constants/app-message.const'
import { AppError } from '@/utils/error-handling.util'

function healthSuccess(_req: Request, res: Response, next: NextFunction) {
  try {
    res.json({ message: appMessage.success.OK })
  } catch (error) {
    next(error)
  }
}

function healthError(_req: Request, _res: Response, next: NextFunction) {
  try {
    throw new AppError('Test error function', 400, 'LOW', {
      functionName: 'healthError',
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
  healthSuccess,
  healthError,
}
