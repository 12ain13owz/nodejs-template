import { z } from 'zod'

import { NodeEnv } from '@/const/env/env.const'

export const envSchema = z.object({
  PORT: z
    .string()
    .transform((val) => Number(val))
    .pipe(z.number().int().positive()),
  NODE_ENV: z.enum([NodeEnv.DEVELOPMENT, NodeEnv.PRODUCTION]),
  BASE_URL: z.string(),
})

export type EnvSchema = z.infer<typeof envSchema>
