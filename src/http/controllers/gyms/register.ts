import { makeRegisterGymUseCase } from '@/use-cases/factories/make-register-gym-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    title: z.string(),
    description: z.string().nullable(),
    phone: z.string().nullable(),
    latitude: z.number().refine((value) => Math.abs(value) <= 90),
    longitude: z.number().refine((value) => Math.abs(value) <= 180),
  })

  const { title, description, phone, latitude, longitude } =
    registerBodySchema.parse(request.body)

  const useCase = makeRegisterGymUseCase()
  await useCase.execute({ title, description, phone, latitude, longitude })

  return reply.status(201).send()
}
