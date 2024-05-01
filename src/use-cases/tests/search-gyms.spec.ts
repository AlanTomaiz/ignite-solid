import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { SearchGymsUseCase } from '../search-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: SearchGymsUseCase

describe('CheckIns Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymsUseCase(gymsRepository)
  })

  it('should be able to search gyms', async () => {
    await gymsRepository.create({
      title: 'Gym to Return in Test',
      latitude: -23.4505052,
      longitude: -51.9847876,
    })

    await gymsRepository.create({
      title: 'Gym Untest',
      latitude: -23.4505052,
      longitude: -51.9847876,
    })

    const { gyms } = await sut.execute({ query: 'return' })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Gym to Return in Test' }),
    ])
  })

  it('should be able to fetch paginated search', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `Gym test ${i}`,
        latitude: -23.4505052,
        longitude: -51.9847876,
      })
    }

    const { gyms } = await sut.execute({ query: 'test', page: 2 })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Gym test 21' }),
      expect.objectContaining({ title: 'Gym test 22' }),
    ])
  })
})
