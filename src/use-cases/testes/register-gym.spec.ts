import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { RegisterGymUseCase } from '../register-gym'

let gymsRepository: InMemoryGymsRepository
let sut: RegisterGymUseCase

describe('Register Gym UseCase', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new RegisterGymUseCase(gymsRepository)
  })

  it('should be able register an gym', async () => {
    const { id } = await sut.execute({
      title: 'Gym Teste',
      description: null,
      phone: null,
      latitude: -23.4505052,
      longitude: -51.9847876,
    })

    expect(id).toEqual(expect.any(String))
  })
})
