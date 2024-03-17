import { ResourceNotFoundError } from '@/errors/resource-not-found'
import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-user-repository'
import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { GetUserProfileUseCase } from '../get-user-profile'

let usersRepository: InMemoryUserRepository
let sut: GetUserProfileUseCase

describe('Authenticate Use Case', () => {
  beforeEach(async () => {
    usersRepository = new InMemoryUserRepository()
    sut = new GetUserProfileUseCase(usersRepository)
  })

  it('should be able get user profile with id', async () => {
    const createdUser = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({ userId: createdUser.id })

    expect(user.id).toEqual(createdUser.id)
    expect(user.name).toEqual('John Doe')
    expect(user.email).toEqual('johndoe@example.com')
  })

  it('should not be able get user profile with wrong id', async () => {
    await expect(() =>
      sut.execute({ userId: 'example-id-not-exists' }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
