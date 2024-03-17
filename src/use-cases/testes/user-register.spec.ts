import { UserAlreadyExistsError } from '@/errors/user-already-exists'
import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-user-repository'
import { compare } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { RegisterUserUseCase } from '../user-register'

let usersRepository: InMemoryUserRepository
let sut: RegisterUserUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUserRepository()
    sut = new RegisterUserUseCase(usersRepository)
  })

  it('should able user register', async () => {
    const { id } = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(id).toEqual(expect.any(String))
  })

  it('should not be able register two users with the same email', async () => {
    const userData = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    }

    await sut.execute(userData)

    await expect(() => sut.execute(userData)).rejects.toBeInstanceOf(
      UserAlreadyExistsError,
    )
  })

  it('should able password is hashed', async () => {
    const { password_hash } = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    const isHashedPassword = await compare('123456', password_hash)

    expect(isHashedPassword).toBe(true)
  })
})
