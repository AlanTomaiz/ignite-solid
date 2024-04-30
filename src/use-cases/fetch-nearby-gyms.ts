import { GymsRepository } from '@/repositories/gyms-repository'

interface Request {
  latitude: number
  longitude: number
}

export class FetchNearbyGyms {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({ latitude, longitude }: Request) {
    const gyms = await this.gymsRepository.findManyNearby({
      latitude,
      longitude,
    })

    return { gyms }
  }
}
