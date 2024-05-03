import { FastifyReply, FastifyRequest } from 'fastify'

export async function refresh(request: FastifyRequest, reply: FastifyReply) {
  await request.jwtVerify({ onlyCookie: true })

  const token = await reply.jwtSign({}, { sub: request.user.sub })

  const refreshToken = await reply.jwtSign(
    {},
    { sub: request.user.sub, expiresIn: '7d' },
  )

  return reply
    .status(201)
    .setCookie('refreshToken', refreshToken, {
      path: '/',
      httpOnly: true,
      sameSite: true,
      secure: true,
    })
    .send(token)
}
