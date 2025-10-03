export type EndpointContext = {
  method: string
  url: string
  params?: Record<string, unknown>
  query?: Record<string, unknown>
  body?: Record<string, unknown>
}

export type ErrorContext = {
  operationName?: string
  endpoint?: EndpointContext
  additionalData?: Record<string, unknown>
}
