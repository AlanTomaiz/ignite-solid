import { CheckInExpiredError } from '@/errors/CheckInExpiredError'
import { ResourceNotFoundError } from '@/errors/resource-not-found'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-in-repository'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ValidateCheckInUseCase } from '../validate-check-in'

let checkInRepository: InMemoryCheckInsRepository
let sut: ValidateCheckInUseCase

describe('CheckIns Use Case', () => {
  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInsRepository()
    sut = new ValidateCheckInUseCase(checkInRepository)

    vi.useFakeTimers()
  })

  it('should be able to validate an check-in', async () => {
    const checkInCreated = await checkInRepository.create({
      gym_id: 'gym_id',
      user_id: 'user_id',
    })

    const { checkIn } = await sut.execute({ checkInId: checkInCreated.id })

    expect(checkInCreated.validated_at).toEqual(null)
    expect(checkIn.validated_at).toEqual(expect.any(Date))
  })

  it('should not be able to validate an inexistent check-in', async () => {
    await expect(() =>
      sut.execute({ checkInId: 'inexistent_id' }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not be able to validate check-in after 20 minutes from created', async () => {
    const checkInCreated = await checkInRepository.create({
      gym_id: 'gym_id',
      user_id: 'user_id',
    })

    const tewntyOneMinutesInMs = 1000 * 60 * 21
    vi.advanceTimersByTime(tewntyOneMinutesInMs)

    await expect(() =>
      sut.execute({ checkInId: checkInCreated.id }),
    ).rejects.toBeInstanceOf(CheckInExpiredError)
  })
})
