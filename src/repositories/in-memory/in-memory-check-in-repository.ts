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

    this.items.push(checkIn)

    return checkIn
  }

  async findByUserIdOnDate(user_id: string, date: string | Date) {
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
}
