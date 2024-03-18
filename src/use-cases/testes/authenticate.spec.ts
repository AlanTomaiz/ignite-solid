import { InvalidCredentialsError } from '@/errors/invalid-credentials'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-user-repository'
import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { AuthenticateUseCase } from '../authenticate'

let usersRepository: InMemoryUsersRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(async () => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUseCase(usersRepository)

    await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
    })
  })

  it('should be able user authenticate', async () => {
    const { user } = await sut.execute({
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able user authenticate with wrong email', async () => {
    await expect(() =>
      sut.execute({
        email: 'example@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able user authenticate with wrong password', async () => {
    await expect(() =>
      sut.execute({
        email: 'johndoe@example.com',
        password: 'invalid-password',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
