export type EnvFile = '.env.development' | '.env.production'
export type NodeEnv = 'development' | 'production'

export type AppConfig = {
  port: number
  node_env: NodeEnv
}
