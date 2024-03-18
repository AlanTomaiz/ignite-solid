import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-in-repository'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { CheckInUseCase } from '../check-in'

let checkInRepository: InMemoryCheckInsRepository
let sut: CheckInUseCase

describe('CheckIns Use Case', () => {
  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInsRepository()
    sut = new CheckInUseCase(checkInRepository)

    vi.useFakeTimers()
  })

  it('should be able to create an check in', async () => {
    const { checkin } = await sut.execute({
      user_id: 'user_id',
      gym_id: 'gym_id',
    })

    expect(checkin.id).toEqual(expect.any(String))
  })

  it('should not be able to create two check in on the same date', async () => {
    vi.setSystemTime(new Date(2024, 2, 17, 20, 0, 0))

    await sut.execute({
      user_id: 'user_id',
      gym_id: 'gym_id',
    })

    await expect(() =>
      sut.execute({
        user_id: 'user_id',
        gym_id: 'gym_id',
      }),
    ).rejects.toBeInstanceOf(Error)
  })

  it('should be able to create two check in on the different dates', async () => {
    vi.setSystemTime(new Date(2024, 2, 17, 20, 0, 0))

    await sut.execute({
      user_id: 'user_id',
      gym_id: 'gym_id',
    })

    vi.setSystemTime(new Date(2024, 2, 18, 20, 0, 0))

    const { checkin } = await sut.execute({
      user_id: 'user_id',
      gym_id: 'gym_id',
    })

    expect(checkin.id).toEqual(expect.any(String))
  })
})
