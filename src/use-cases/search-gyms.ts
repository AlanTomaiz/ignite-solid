import { GymsRepository } from '@/repositories/gyms-repository'

interface Request {
  query: string
  page?: number
  limit?: number
}

export class SearchGymsUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({ query, page = 1, limit = 20 }: Request) {
    const gyms = await this.gymsRepository.searchMany(query, {
      page,
      limit,
    })

    return { gyms }
  }
}
