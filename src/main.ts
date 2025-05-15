import express from 'express'
import morgan from 'morgan'

import { getConfig } from './config'
import { errorHandler } from './middlewares/error-response.middleware'
import routes from './routes'
import { logger } from './utils/logger.util'

const app = express()
const port = getConfig('port')

app.use(morgan('dev'))
app.use(express.json())

app.use(routes)
app.use(errorHandler)

const main = () => {
  try {
    logger.info(`Server listening at http://localhost:${port}`)
  } catch (error) {
    logger.error(error)
    process.exit(1)
  }
}

app.listen(port, main)
