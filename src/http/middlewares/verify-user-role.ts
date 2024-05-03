import { AppError } from '@/errors/app-error'
import { FastifyReply, FastifyRequest } from 'fastify'

export function verifyUserRole(userRole: 'ADMIN' | 'MEMBER') {
  return async (request: FastifyRequest, _: FastifyReply) => {
    const { role } = request.user

    if (role !== userRole) {
      throw new AppError('Unauthorized.', 401)
    }
  }
}
