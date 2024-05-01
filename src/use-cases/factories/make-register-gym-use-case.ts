import { PrimsaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { RegisterGymUseCase } from '../register-gym'

export function makeRegisterGymUseCase() {
  const gymsRepository = new PrimsaGymsRepository()
  const useCase = new RegisterGymUseCase(gymsRepository)

  return useCase
}
