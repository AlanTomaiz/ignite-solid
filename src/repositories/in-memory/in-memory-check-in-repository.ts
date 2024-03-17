import { randomUUID } from 'node:crypto'
import {
  CheckIn,
  CheckInCreateInput,
  CheckInRepository,
} from '../check-in-respotiory'

export class InMemoryCheckInRepository implements CheckInRepository {
  public items: CheckIn[] = []

  async create(data: CheckInCreateInput) {
    const checkIn = {
      id: randomUUID(),
      user_id: data.user_id,
      gym_id: data.gym_id,
      validated_at: data.validated_at,
      created_at: new Date(),
    }

    this.items.push(checkIn)

    return checkIn
  }

  async findByUserIdOnDate(user_id: string, date: string | Date) {
    const checkin = this.items.find((row) => row.user_id === user_id)

    if (!checkin) {
      return null
    }

    return checkin
  }
}
