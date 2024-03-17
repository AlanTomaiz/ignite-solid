import {
  CheckInCreateInput,
  CheckInRepository,
} from '@/repositories/check-in-respotiory'

export class CheckInUseCase {
  constructor(private checkInRepository: CheckInRepository) {}

  async execute(data: CheckInCreateInput) {
    const hasCheckInTheSameDate =
      await this.checkInRepository.findByUserIdOnDate(data.user_id, new Date())

    if (hasCheckInTheSameDate) {
      throw new Error()
    }

    const checkin = await this.checkInRepository.create({
      user_id: data.user_id,
      gym_id: data.gym_id,
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
    })

    return { checkin }
  }
}
