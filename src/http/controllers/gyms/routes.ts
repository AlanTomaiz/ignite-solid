import { FastifyInstance } from 'fastify'

import { VerifyJWT } from '@/http/middlewares/verify-jwt'
import { nearby } from './nearby'
import { register } from './register'
import { search } from './search'

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', VerifyJWT)

  app.post('/gyms', register)

  app.get('/gyms/search', search)
  app.get('/gyms/nearby', nearby)
}
