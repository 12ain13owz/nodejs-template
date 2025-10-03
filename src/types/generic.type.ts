import { NodeEnv } from '@/const/env/env.const'
import { LogLevel } from '@/const/utils/logger.const'

export type AppConfig = {
  port: number
  node_env: NodeEnv
  baseUrl: string
  logLevel: {
    console: LogLevel
    file: LogLevel
    errorFile: LogLevel
  }
}

export interface AppResponse<T> {
  message: string
  timestamp: string
  data?: T
}
