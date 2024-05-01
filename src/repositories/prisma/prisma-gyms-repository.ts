import { Paginated } from '@/@types/global'
import { prisma } from '@/lib/prisma'
import { getDistanceBetweenCoordinatesQuery } from '@/utils/get-distance-between-coordinates'
import {
  FindManyNearbyParams,
  Gym,
  GymCreateInput,
  GymsRepository,
} from '../gyms-repository'

export class PrimsaGymsRepository implements GymsRepository {
  async findManyNearby({ latitude, longitude }: FindManyNearbyParams) {
    return prisma.$queryRaw<Gym[]>`
      SELECT * FROM gyms
      WHERE ${getDistanceBetweenCoordinatesQuery({ latitude, longitude })} <= 10
    `
  }

  async findById(id: string) {
    return prisma.gym.findUnique({
      where: { id },
    })
  }

  async searchMany(query: string, options: Paginated) {
    const skip = (options.page - 1) * options.limit

    return prisma.gym.findMany({
      where: {
        title: { contains: query },
      },
      take: options.limit,
      skip,
    })
  }

  async create(data: GymCreateInput) {
    return prisma.gym.create({ data })
  }
}
