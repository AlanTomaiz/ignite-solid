import { CheckInsRepository } from '@/repositories/check-ins-respotiory'

interface Request {
  userId: string
}

export class GetUserMetricsUseCase {
  constructor(private checkInRepository: CheckInsRepository) {}

  async execute({ userId }: Request) {
    const checkInsCount = await this.checkInRepository.countByUserId(userId)

    return { checkInsCount }
  }
}
