import { Paginated } from '@/@types/global'
import dayjs from 'dayjs'
import { randomUUID } from 'node:crypto'
import {
  CheckIn,
  CheckInCreateInput,
  CheckInsRepository,
} from '../check-ins-respotiory'

export class InMemoryCheckInsRepository implements CheckInsRepository {
  public items: CheckIn[] = []

  async create(data: CheckInCreateInput) {
    const checkIn = {
      id: randomUUID(),
      user_id: data.user_id,
      gym_id: data.gym_id,
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
      created_at: new Date(),
    }

    this.items.push({ ...checkIn })

    return checkIn
  }

  async findById(checkin_id: string) {
    return this.items.find((row) => row.id === checkin_id) ?? null
  }

  async countByUserId(user_id: string): Promise<number> {
    return this.items.filter((row) => row.user_id === user_id).length
  }

  async findByUserIdOnDate(user_id: string, date: Date) {
    const startOfTheDay = dayjs(date).startOf('date')
    const endOfTheDay = dayjs(date).endOf('date')

    const checkin = this.items.find((row) => {
      const checkInDate = dayjs(row.created_at)

      const isOnSameDate =
        checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay)

      return row.user_id === user_id && isOnSameDate
    })

    if (!checkin) {
      return null
    }

    return checkin
  }

  async fetchUserHistory(user_id: string, { page, limit }: Paginated) {
    const skipOf = (page - 1) * limit
    const offset = page * limit

    return this.items
      .filter((row) => row.user_id === user_id)
      .slice(skipOf, offset)
  }

  async save(checkIn: CheckIn) {
    const checkInIndex = this.items.findIndex((row) => row.id === checkIn.id)
    if (checkInIndex >= 0) {
      this.items[checkInIndex] = checkIn
    }

    return checkIn
  }
}
