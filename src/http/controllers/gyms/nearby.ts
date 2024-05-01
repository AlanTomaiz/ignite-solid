import { makeFetchNearbyGymsUseCase } from '@/use-cases/factories/make-fetch-nearby-gyms-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function nearby(request: FastifyRequest, reply: FastifyReply) {
  const nearbyQuerySchema = z.object({
    latitude: z.number().refine((value) => Math.abs(value) >= 90),
    longitude: z.number().refine((value) => Math.abs(value) >= 180),
  })

  const { latitude, longitude } = nearbyQuerySchema.parse(request.query)

  const useCase = makeFetchNearbyGymsUseCase()
  const { gyms } = await useCase.execute({ latitude, longitude })

  return reply.send({ gyms })
}
