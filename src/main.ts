import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import path from 'path'

import { config } from './config'
import { GENERIC } from './const/systems/generic.const'
import { errorHandler } from './middlewares/error-response.middleware'
import { limiter } from './middlewares/rate-limit.middleware'
import { mainRoutes } from './routes'
import { helmetOptions } from './utils/generic.utils'
import { logger } from './utils/logger.utils'

const app = express()
const port = config.port
const baseUrl = config.baseUrl

app.use(cors())
app.use(helmet(helmetOptions))
app.use(morgan('dev'))
app.use(express.json())
app.use(limiter)

app.use('/docs', express.static(path.join(__dirname, '../docs')))
app.use(mainRoutes)
app.use(errorHandler)

const main = async () => {
  logger.info(GENERIC.serverListening(baseUrl, port))
}

app.listen(port, () => {
  main().catch((error) => {
    logger.error(error)
    process.exit(1)
  })
})
