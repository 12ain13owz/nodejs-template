const httpErrors = {
  BAD_REQUEST: 'Bad request',
  BAD_GATEWAY: 'Bad gateway',
  UNAUTHORIZED: 'Unauthorized',
  FORBIDDEN: 'Forbidden',
  NOT_FOUND: 'Not found',
  INTERNAL_SERVER_ERROR: 'Internal server error',
  METHOD_NOT_ALLOWED: 'Method not allowed',
  TOO_MANY_REQUESTS: 'Too many requests. Please try again later.',
}

const internalErrors = {
  UNKNOWN_FUNCTION: 'Unknown function',
}

const success = {
  OK: 'OK',
}

export const appMessage = {
  httpErrors,
  internalErrors,
  success,
}
