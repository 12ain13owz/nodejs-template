/* eslint-disable no-console */
/* eslint-disable no-process-env */
import chalk from 'chalk'
import dotenv from 'dotenv'
import { existsSync } from 'node:fs'
import { resolve } from 'node:path'

import { EnvFile, NodeEnv } from '@/const/env/env.const'
import { ERRORS } from '@/const/systems/errors.const'
import { SUCCESS } from '@/const/systems/success.const'

export function loadEnvFile(): void {
  const nodeEnv = (process.env.NODE_ENV as NodeEnv | undefined) || NodeEnv.DEVELOPMENT
  const envFile = nodeEnv === NodeEnv.PRODUCTION ? EnvFile.PRODUCTION : EnvFile.DEVELOPMENT
  const envPath = resolve(process.cwd(), envFile)

  try {
    if (!existsSync(envPath)) throw new Error(ERRORS.UTIL.notFound(envFile))

    dotenv.config({ path: envPath })
    console.info(chalk.greenBright(SUCCESS.CONFIG.load(envFile)))
  } catch (error) {
    console.error(chalk.redBright(error))
    process.exit(1)
  }
}
