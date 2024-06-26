import { FastifyInstance } from 'fastify'

import { VerifyJWT } from '@/http/middlewares/verify-jwt'
import { authenticate } from './authenticate'
import { profile } from './profile'
import { refresh } from './refresh'
import { register } from './register'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticate)

  app.patch('/token/refresh', refresh)

  // authenticated routes
  app.get('/me', { onRequest: [VerifyJWT] }, profile)
}
