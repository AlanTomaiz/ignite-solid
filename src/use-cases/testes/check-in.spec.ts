import { MaxDistanceError } from '@/errors/max-distance'
import { MaxNumberOfCheckInsError } from '@/errors/max-number-of-check-ins'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-in-repository'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { CheckInUseCase } from '../check-in'

let checkInRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase

describe('CheckIns Use Case', () => {
  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInUseCase(checkInRepository, gymsRepository)

    // -23.4312121,-51.8839795
    gymsRepository.gyms.push({
      id: 'gym_id',
      title: 'Gym test',
      latitude: -23.4312121,
      longitude: -51.8839795,
      created_at: new Date(),
    })

    vi.useFakeTimers()
  })

  it('should be able to create an check-in', async () => {
    const { checkin } = await sut.execute({
      userId: 'user_id',
      gymId: 'gym_id',
      userLatitude: -23.4312121,
      userLongitude: -51.8839795,
    })

    expect(checkin.id).toEqual(expect.any(String))
  })

  it('should not be able to create two check-in on the same date', async () => {
    vi.setSystemTime(new Date(2024, 2, 17, 20, 0, 0))

    await sut.execute({
      userId: 'user_id',
      gymId: 'gym_id',
      userLatitude: -23.4312121,
      userLongitude: -51.8839795,
    })

    await expect(() =>
      sut.execute({
        userId: 'user_id',
        gymId: 'gym_id',
        userLatitude: -23.4312121,
        userLongitude: -51.8839795,
      }),
    ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError)
  })

  it('should be able to create two check-in on the different dates', async () => {
    vi.setSystemTime(new Date(2024, 2, 17, 20, 0, 0))

    await sut.execute({
      userId: 'user_id',
      gymId: 'gym_id',
      userLatitude: -23.4312121,
      userLongitude: -51.8839795,
    })

    vi.setSystemTime(new Date(2024, 2, 18, 20, 0, 0))

    const { checkin } = await sut.execute({
      userId: 'user_id',
      gymId: 'gym_id',
      userLatitude: -23.4312121,
      userLongitude: -51.8839795,
    })

    expect(checkin.id).toEqual(expect.any(String))
  })

  it('should not be able to create check-in on distance of gym', async () => {
    // -23.4505052,-51.9847876
    gymsRepository.gyms.push({
      id: 'gym_distance',
      title: 'Gym test 2',
      latitude: -23.4505052,
      longitude: -51.9847876,
      created_at: new Date(),
    })

    await expect(() =>
      sut.execute({
        userId: 'user_id',
        gymId: 'gym_distance',
        userLatitude: -23.4312121,
        userLongitude: -51.8839795,
      }),
    ).rejects.toBeInstanceOf(MaxDistanceError)
  })
})
