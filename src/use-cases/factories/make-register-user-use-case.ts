import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { RegisterUserUseCase } from '../register-user'

export function makeRegisterUserUseCase() {
  const userRepository = new PrismaUsersRepository()
  const useCase = new RegisterUserUseCase(userRepository)

  return useCase
}
