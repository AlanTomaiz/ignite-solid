import { PrismaUserRepository } from '@/repositories/prisma/prisma-user-repository'
import { RegisterUserUseCase } from '@/use-cases/user-register'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { name, email, password } = registerBodySchema.parse(request.body)

  const userRepository = new PrismaUserRepository()
  const registerUseCase = new RegisterUserUseCase(userRepository)

  try {
    await registerUseCase.execute({ name, email, password })
  } catch {
    return reply.status(409).send()
  }

  return reply.status(201).send()
}
