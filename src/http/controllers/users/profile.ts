import { makeGetUserProfileUseCase } from '@/use-cases/factories/make-get-user-profile-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  const profileUseCase = makeGetUserProfileUseCase()
  const { user } = await profileUseCase.execute({ userId: request.user.sub })

  return reply.send({
    user: {
      ...user,
      password_hash: undefined,
    },
  })
}
