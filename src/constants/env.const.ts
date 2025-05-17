import { NodeEnv, EnvFile } from '@/types/config.type'

const DEVELOPMENT: NodeEnv = 'development'
const PRODUCTION: NodeEnv = 'production'
const ENV_DEVELOPMENT: EnvFile = '.env.development'
const ENV_PRODUCTION: EnvFile = '.env.production'

export const envConst = {
  DEVELOPMENT,
  PRODUCTION,
  ENV_DEVELOPMENT,
  ENV_PRODUCTION,
}
