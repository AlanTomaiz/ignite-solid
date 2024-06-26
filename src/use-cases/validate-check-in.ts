import { CheckInExpiredError } from '@/errors/check-in-expired'
import { ResourceNotFoundError } from '@/errors/resource-not-found'
import { CheckInsRepository } from '@/repositories/check-ins-respotiory'
import dayjs from 'dayjs'

interface Request {
  checkInId: string
}

export class ValidateCheckInUseCase {
  constructor(private checkInRepository: CheckInsRepository) {}

  async execute({ checkInId }: Request) {
    const checkIn = await this.checkInRepository.findById(checkInId)

    if (!checkIn) {
      throw new ResourceNotFoundError()
    }

    const distanceInMinutesFromCreated = dayjs(new Date()).diff(
      checkIn.created_at,
      'minutes',
    )

    if (distanceInMinutesFromCreated > 20) {
      throw new CheckInExpiredError()
    }

    checkIn.validated_at = new Date()
    await this.checkInRepository.save(checkIn)

    return { checkIn }
  }
}
