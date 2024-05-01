import { FastifyInstance } from 'fastify'

import { VerifyJWT } from '@/http/middlewares/verify-jwt'
import { create } from './create'
import { history } from './history'
import { metrics } from './metrics'
import { validate } from './validate'

export async function checkInsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', VerifyJWT)

  app.post('/check-ins/:gymId/create', create)
  app.patch('/check-ins/:checkInId/validate', validate)

  app.get('/check-ins/history', history)
  app.get('/check-ins/metrics', metrics)
}
