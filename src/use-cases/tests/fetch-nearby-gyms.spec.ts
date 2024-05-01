import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { FetchNearbyGyms } from '../fetch-nearby-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: FetchNearbyGyms

describe('Fetch nearby gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyGyms(gymsRepository)
  })

  it('should be able to search gyms', async () => {
    await gymsRepository.create({
      title: 'Gym to Return in Test',
      latitude: -23.4312121,
      longitude: -51.8839795,
    })

    await gymsRepository.create({
      title: 'Gym Untest',
      latitude: -23.4851168,
      longitude: -51.8029996,
    })

    const { gyms } = await sut.execute({
      latitude: -23.4312121,
      longitude: -51.8839795,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Gym to Return in Test' }),
    ])
  })
})
