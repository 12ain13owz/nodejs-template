import { Router } from 'express'

import {
  healthErrorController,
  healthSuccessController,
} from '@/controllers/health.controller'

const router = Router()

router.get('/', healthSuccessController)
router.get('/error', healthErrorController)

export default router
