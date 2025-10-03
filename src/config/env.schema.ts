import { z } from 'zod'

import { NodeEnv } from '@/const/env/env.const'
import { LogLevel } from '@/const/utils/logger.const'

const logLevel: LogLevel[] = ['error', 'warn', 'info', 'http', 'verbose', 'debug']
export const envSchema = z.object({
  PORT: z
    .string()
    .transform((val) => Number(val))
    .pipe(z.number().int().positive()),
  NODE_ENV: z.enum([NodeEnv.DEVELOPMENT, NodeEnv.PRODUCTION]),
  BASE_URL: z.string(),
  LOG_LEVEL_CONSOLE: z.enum(logLevel),
  LOG_LEVEL_FILE: z.enum(logLevel),
  LOG_LEVEL_ERROR_FILE: z.enum(logLevel),
})

export type EnvSchema = z.infer<typeof envSchema>
