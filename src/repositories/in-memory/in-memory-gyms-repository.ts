import { Paginated } from '@/@types/global'
import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordinates'
import { randomUUID } from 'node:crypto'
import {
  FindManyNearbyParams,
  Gym,
  GymCreateInput,
  GymsRepository,
} from '../gyms-repository'

export class InMemoryGymsRepository implements GymsRepository {
  public gyms: Gym[] = []

  async create(data: GymCreateInput) {
    const gym = {
      id: randomUUID(),
      title: data.title,
      description: data.description ?? null,
      phone: data.phone ?? null,
      latitude: data.latitude,
      longitude: data.longitude,
      created_at: new Date(),
    }

    this.gyms.push(gym)

    return gym
  }

  async findManyNearby(params: FindManyNearbyParams) {
    return this.gyms.filter((row) => {
      const distance = getDistanceBetweenCoordinates(
        { latitude: params.latitude, longitude: params.longitude },
        { latitude: row.latitude, longitude: row.longitude },
      )

      return distance <= 10
    })
  }

  async findById(id: string) {
    const gym = this.gyms.find((row) => row.id === id)

    if (!gym) {
      return null
    }

    return gym
  }

  async searchMany(query: string, { page, limit }: Paginated) {
    const skipOf = (page - 1) * limit
    const offset = page * limit

    return this.gyms
      .filter((row) => row.title.toLowerCase().includes(query.toLowerCase()))
      .slice(skipOf, offset)
  }
}
