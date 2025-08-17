export const ERRORS = {
  SYSTEM: {
    VALIDATION_ERROR: 'An unexpected error occurred during request validation',
    BAD_REQUEST: 'Bad request',
    UNAUTHORIZED: 'Unauthorized',
    FORBIDDEN: 'Forbidden',
    NOT_FOUND: 'Not found',
    INTERNAL_SERVER_ERROR: 'Internal server error',
    METHOD_NOT_ALLOWED: 'Method not allowed',
    TOO_MANY_REQUESTS: 'Too many requests. Please try again later',
    BAD_GATEWAY: 'Bad gateway',
    UNSPECIFIED_FUNCTION: 'Unspecified function',
  },
  CONFIG: {
    load: (envFile: string) => `[Config] ❌ Unexpected error loading ${envFile}:`,
  },
  UTIL: {
    notFound: (item: string) => `${item} not found`,
    alreadyExists: (item: string) => `${item} already exists`,
    invalidField: (field: string) => `Invalid ${field} format`,
    invalidType: (field: string, type: string) => `${field} must be of type ${type}`,
    requiredField: (field: string) => `${field} is required`,
    failedAction: (action?: string, target?: string) => `Failed to ${action} ${target}`,
  },
}
