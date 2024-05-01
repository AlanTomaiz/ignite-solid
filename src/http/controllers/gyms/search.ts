import { makeSearchGymsUseCase } from '@/use-cases/factories/make-search-gyms-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchQuerySchema = z.object({
    q: z.string(),
    page: z.coerce.number().min(1).default(1),
    limit: z.coerce.number().default(20),
  })

  const { q: query, page, limit } = searchQuerySchema.parse(request.query)

  const useCase = makeSearchGymsUseCase()
  const { gyms } = await useCase.execute({ query, page, limit })

  return reply.send({ gyms })
}
