import { prisma } from '@/lib/prisma'
import { User, UserCreateInput, UserRepository } from '../user-repository'

export class PrismaUserRepository implements UserRepository {
  create(data: UserCreateInput): Promise<User> {
    return prisma.user.create({ data })
  }

  findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { email },
    })
  }
}
