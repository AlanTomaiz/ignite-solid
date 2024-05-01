import { makeValidateCheckInUseCase } from '@/use-cases/factories/make-validate-check-in-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function validate(request: FastifyRequest, reply: FastifyReply) {
  const validateParamsSchema = z.object({
    checkInId: z.string(),
  })

  const { checkInId } = validateParamsSchema.parse(request.params)

  const useCase = makeValidateCheckInUseCase()
  await useCase.execute({ checkInId })

  return reply.status(204).send()
}
