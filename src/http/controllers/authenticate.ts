import { AuthenticateUseCase } from '@/get-user-metrics.ts/authenticate'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = registerBodySchema.parse(request.body)

  const userRepository = new PrismaUsersRepository()
  const registerUseCase = new AuthenticateUseCase(userRepository)

  await registerUseCase.execute({ email, password })

  return reply.status(200).send()
}
