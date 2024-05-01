import { Paginated } from '@/@types/global'
import { prisma } from '@/lib/prisma'
import dayjs from 'dayjs'
import {
  CheckIn,
  CheckInCreateInput,
  CheckInsRepository,
} from '../check-ins-respotiory'

export class PrismaCheckInsRepository implements CheckInsRepository {
  async create(data: CheckInCreateInput) {
    return prisma.checkIn.create({ data })
  }

  async findById(checkin_id: string) {
    return prisma.checkIn.findUnique({
      where: { id: checkin_id },
    })
  }

  async countByUserId(user_id: string) {
    return prisma.checkIn.count({
      where: { user_id },
    })
  }

  async findByUserIdOnDate(user_id: string, date: Date) {
    const startOfTheDay = dayjs(date).startOf('date')
    const endOfTheDay = dayjs(date).endOf('date')

    return prisma.checkIn.findFirst({
      where: {
        user_id,
        created_at: {
          gte: startOfTheDay.toDate(),
          lte: endOfTheDay.toDate(),
        },
      },
    })
  }

  async fetchUserHistory(user_id: string, options: Paginated) {
    const skip = (options.page - 1) * options.limit

    return prisma.checkIn.findMany({
      where: { user_id },
      take: options.limit,
      skip,
    })
  }

  async save(data: CheckIn) {
    return prisma.checkIn.update({
      where: { id: data.id },
      data,
    })
  }
}
