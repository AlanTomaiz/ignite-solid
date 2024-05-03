import { makeAuthenticateUseCase } from '@/use-cases/factories/make-authenticate-use-case'
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

  const registerUseCase = makeAuthenticateUseCase()
  const { user } = await registerUseCase.execute({ email, password })

  const token = await reply.jwtSign({}, { sub: user.id })

  const refreshToken = await reply.jwtSign(
    {},
    { sub: user.id, expiresIn: '7d' },
  )

  return reply
    .status(201)
    .setCookie('refreshToken', refreshToken, {
      path: '/',
      secure: true,
      httpOnly: true,
      sameSite: true,
    })
    .send(token)
}
