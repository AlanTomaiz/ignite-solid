import { FastifyInstance } from 'fastify'

import { VerifyJWT } from '@/http/middlewares/verify-jwt'
import { verifyUserRole } from '@/http/middlewares/verify-user-role'
import { nearby } from './nearby'
import { register } from './register'
import { search } from './search'

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', VerifyJWT)

  app.post('/gyms', { onRequest: [verifyUserRole('ADMIN')] }, register)

  app.get('/gyms/search', search)
  app.get('/gyms/nearby', nearby)
}
