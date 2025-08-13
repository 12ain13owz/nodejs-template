export interface AppResponse<T> {
  data?: T
  message: string
  timestamp: string
}
