import { PrimsaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { FetchNearbyGyms } from '../fetch-nearby-gyms'

export function makeFetchNearbyGymsUseCase() {
  const gymsRepository = new PrimsaGymsRepository()
  const useCase = new FetchNearbyGyms(gymsRepository)

  return useCase
}
