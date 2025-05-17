const httpErrors = {
  BAD_REQUEST: 'Bad request',
  BAD_GATEWAY: 'Bad gateway',
  UNAUTHORIZED: 'Unauthorized',
  FORBIDDEN: 'Forbidden',
  NOT_FOUND: 'Not found',
  INTERNAL_SERVER_ERROR: 'Internal server error',
  METHOD_NOT_ALLOWED: 'Method not allowed',
  TOO_MANY_REQUESTS: 'Too many requests. Please try again later.',
} as const

const internalErrors = {
  UNKNOWN_FUNCTION: 'Unknown function',
} as const

const success = {
  OK: 'OK',
} as const

export const messageConst = {
  httpErrors,
  internalErrors,
  success,
}
