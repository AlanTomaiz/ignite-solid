import { makeFetchUserCheckInsHistoryUseCase } from '@/use-cases/factories/make-fetch-user-check-ins-history-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function history(request: FastifyRequest, reply: FastifyReply) {
  const historyQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
    limit: z.coerce.number().default(20),
  })

  const { page, limit } = historyQuerySchema.parse(request.query)

  const useCase = makeFetchUserCheckInsHistoryUseCase()
  const { history } = await useCase.execute({
    userId: request.user.sub,
    page,
    limit,
  })

  return reply.send({ history })
}
