import { NextFunction, Request, Response, Router } from 'express'

import { docsRouter } from './generic/docs.routes'
import { healthRouter } from './generic/health.routes'

const router = Router()

router.get('/', (_req: Request, res: Response, _next: NextFunction) => {
  res.json({ message: 'Hello World!' })
})
router.use('/health', healthRouter)
router.use('/docs', docsRouter)

export const mainRoutes = router
