import { prisma } from '@/lib/prisma'
import { User, UserCreateInput, UsersRepository } from '../users-repository'

export class PrismaUsersRepository implements UsersRepository {
  create(data: UserCreateInput): Promise<User> {
    return prisma.user.create({ data })
  }

  findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { email },
    })
  }
}
