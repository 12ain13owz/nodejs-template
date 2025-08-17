import { NodeEnv } from '@/const/env/env.const'

export type AppConfig = {
  port: number
  node_env: NodeEnv
  baseUrl: string
}

export interface AppResponse<T> {
  data?: T
  message: string
  timestamp: string
}
