import rateLimit from 'express-rate-limit'

import { ERRORS } from '@/const/systems/errors.const'
import { HttpStatus } from '@/const/systems/http-status.const'

export const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: ERRORS.SYSTEM.TOO_MANY_REQUESTS,
  statusCode: HttpStatus.TOO_MANY_REQUESTS,
  standardHeaders: true,
  legacyHeaders: false,
})
