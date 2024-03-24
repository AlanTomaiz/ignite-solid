import { CheckInsRepository } from '@/repositories/check-ins-respotiory'

interface Request {
  userId: string
  page?: number
  limit?: number
}

export class FetchUserCheckInsHistoryUseCase {
  constructor(private checkInRepository: CheckInsRepository) {}

  async execute({ userId, page = 1, limit = 20 }: Request) {
    const history = await this.checkInRepository.fetchUserHistory(userId, {
      page,
      limit,
    })

    return { history }
  }
}
