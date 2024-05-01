import { AppError } from '@/errors/app-error'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function VerifyJWT(request: FastifyRequest, reply: FastifyReply) {
  try {
    await request.jwtVerify()
  } catch {
    throw new AppError('Unauthorized.', 401)
  }
}
