import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { GetUserMetricsUseCase } from '../get-user-metrics'

let checkInRepository: InMemoryCheckInsRepository
let sut: GetUserMetricsUseCase

describe('CheckIns Use Case', () => {
  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInsRepository()
    sut = new GetUserMetricsUseCase(checkInRepository)
  })

  it('should be able to get number of total check-ins from user', async () => {
    await checkInRepository.create({
      user_id: 'user_01',
      gym_id: 'gym_01',
    })

    await checkInRepository.create({
      user_id: 'user_01',
      gym_id: 'gym_02',
    })

    const { checkInsCount } = await sut.execute({ userId: 'user_01' })

    expect(checkInsCount).toEqual(2)
  })
})
