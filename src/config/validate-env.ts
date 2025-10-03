/* eslint-disable no-process-env */

import chalk from 'chalk'

import { envSchema, EnvSchema } from './env.schema'

export function validateEnv(): EnvSchema {
  try {
    return envSchema.parse(process.env)
  } catch (error) {
    console.error(chalk.redBright(error))
    process.exit(1)
  }
}
