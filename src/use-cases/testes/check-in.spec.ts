import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-check-in-repository'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { CheckInUseCase } from '../check-in'

let checkInRepository: InMemoryCheckInRepository
let sut: CheckInUseCase

describe('CheckIns Use Case', () => {
  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInRepository()
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
})
