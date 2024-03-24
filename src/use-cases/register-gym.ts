import { GymsRepository } from '@/repositories/gyms-repository'

interface RegisterRequest {
  title: string
  description: string | null
  phone: string | null
  latitude: number
  longitude: number
}

export class RegisterGymUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute(data: RegisterRequest) {
    const { title, description, phone, latitude, longitude } = data

    const gym = await this.gymsRepository.create({
      title,
      description,
      phone,
      latitude,
      longitude,
    })

    return { ...gym }
  }
}
