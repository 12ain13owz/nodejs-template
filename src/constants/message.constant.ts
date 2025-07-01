export const GENERIC = {
  serverListening: (port: number) =>
    `Server listening at http://localhost:${port}`,
}

export const MESSAGES = {
  SUCCESS: {
    OK: 'Operation successful',
    CREATED: 'Data created successfully',
    UPDATED: 'Data updated successfully',
    DELETED: 'Data deleted successfully',
    LOGGED_IN: 'Logged in successfully',
    LOGGED_OUT: 'Logged out successfully',
    SAVED: 'Data saved successfully',

    create: (name: string) => `Created ${name} successfully`,
    update: (name: string) => `Updated ${name} successfully`,
    delete: (name: string) => `Deleted ${name} successfully`,
    save: (name: string) => `Saved ${name} successfully`,
    upload: (name: string) => `Uploaded ${name} successfully`,
  },
  ERROR: {
    notFound: (item: string) => `${item} not found`,
    alreadyExists: (item: string) => `${item} already exists`,
    invalidField: (field: string) => `Invalid ${field}`,
    requiredField: (field: string) => `${field} is required`,
    failedAction: (action: string, target: string) =>
      `Failed to ${action} ${target}`,
  },
} as const

export enum HTTP_ERRORS {
  BAD_REQUEST = 'Bad request',
  BAD_GATEWAY = 'Bad gateway',
  UNAUTHORIZED = 'Unauthorized',
  FORBIDDEN = 'Forbidden',
  NOT_FOUND = 'Not found',
  INTERNAL_SERVER_ERROR = 'Internal server error',
  METHOD_NOT_ALLOWED = 'Method not allowed',
  TOO_MANY_REQUESTS = 'Too many requests. Please try again later.',
}

export enum INTERNAL_ERRORS {
  UNKNOWN_FUNCTION = 'Unknown function',
}
