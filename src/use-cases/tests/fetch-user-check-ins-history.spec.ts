import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { FetchUserCheckInsHistoryUseCase } from '../fetch-user-check-ins-history'

let checkInRepository: InMemoryCheckInsRepository
let sut: FetchUserCheckInsHistoryUseCase

describe('CheckIns Use Case', () => {
  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInsRepository()
    sut = new FetchUserCheckInsHistoryUseCase(checkInRepository)
  })

  it('should be able to fetch check-ins history from user', async () => {
    await checkInRepository.create({
      user_id: 'user_01',
      gym_id: 'gym_01',
    })

    await checkInRepository.create({
      user_id: 'user_01',
      gym_id: 'gym_02',
    })

    const { history } = await sut.execute({ userId: 'user_01' })

    expect(history).toHaveLength(2)
    expect(history).toEqual([
      expect.objectContaining({ gym_id: 'gym_01' }),
      expect.objectContaining({ gym_id: 'gym_02' }),
    ])
  })

  it('should be able to fetch paginated history', async () => {
    for (let i = 1; i <= 22; i++) {
      await checkInRepository.create({
        gym_id: `gym_${i}`,
        user_id: 'user_01',
      })
    }

    const { history } = await sut.execute({ userId: 'user_01', page: 2 })

    expect(history).toHaveLength(2)
    expect(history).toEqual([
      expect.objectContaining({ gym_id: 'gym_21' }),
      expect.objectContaining({ gym_id: 'gym_22' }),
    ])
  })

  it('should be able to fetch paginated history with range/limit', async () => {
    for (let i = 1; i <= 22; i++) {
      await checkInRepository.create({
        gym_id: `gym_${i}`,
        user_id: 'user_01',
      })
    }

    const { history } = await sut.execute({ userId: 'user_01', limit: 5 })

    expect(history).toHaveLength(5)
    expect(history).toEqual([
      expect.objectContaining({ gym_id: 'gym_1' }),
      expect.objectContaining({ gym_id: 'gym_2' }),
      expect.objectContaining({ gym_id: 'gym_3' }),
      expect.objectContaining({ gym_id: 'gym_4' }),
      expect.objectContaining({ gym_id: 'gym_5' }),
    ])
  })
})
