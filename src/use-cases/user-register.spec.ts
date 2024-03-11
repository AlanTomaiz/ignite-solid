import { UserAlreadyExistsError } from '@/errors/user-already-exists'
import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-user-repository'
import { compare } from 'bcryptjs'
import { describe, expect, it } from 'vitest'
import { RegisterUserUseCase } from './user-register'

describe('Register Use Case', () => {
  it('should able user register', async () => {
    const usersRepository = new InMemoryUserRepository()
    const registerUseCase = new RegisterUserUseCase(usersRepository)

    const { id } = await registerUseCase.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(id).toEqual(expect.any(String))
  })

  it('should not be able register two users with the same email', async () => {
    const usersRepository = new InMemoryUserRepository()
    const registerUseCase = new RegisterUserUseCase(usersRepository)

    const userData = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    }

    await registerUseCase.execute(userData)

    expect(() => registerUseCase.execute(userData)).rejects.toBeInstanceOf(
      UserAlreadyExistsError,
    )
  })

  it('should able password is hashed', async () => {
    const usersRepository = new InMemoryUserRepository()
    const registerUseCase = new RegisterUserUseCase(usersRepository)

    const { password_hash } = await registerUseCase.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    const isHashedPassword = await compare('123456', password_hash)

    expect(isHashedPassword).toBe(true)
  })
})
