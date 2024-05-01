import { makeCheckInUseCase } from '@/use-cases/factories/make-check-in-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createParamsSchema = z.object({
    gymId: z.string(),
  })

  const createBodySchema = z.object({
    latitude: z.number().refine((value) => Math.abs(value) >= 90),
    longitude: z.number().refine((value) => Math.abs(value) >= 180),
  })

  const { gymId } = createParamsSchema.parse(request.params)
  const { latitude, longitude } = createBodySchema.parse(request.body)

  const useCase = makeCheckInUseCase()
  await useCase.execute({
    userId: request.user.sub,
    gymId,
    userLatitude: latitude,
    userLongitude: longitude,
  })

  return reply.status(201).send()
}
