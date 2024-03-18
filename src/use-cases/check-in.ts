import { ResourceNotFoundError } from '@/errors/resource-not-found'
import { CheckInsRepository } from '@/repositories/check-ins-respotiory'
import { GymsRepository } from '@/repositories/gyms-repository'
import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordinates'

interface Request {
  userId: string
  gymId: string
  userLatitude: number
  userLongitude: number
}

export class CheckInUseCase {
  constructor(
    private checkInRepository: CheckInsRepository,
    private gymsRepository: GymsRepository,
  ) {}

  async execute({ userId, gymId, userLatitude, userLongitude }: Request) {
    const gym = await this.gymsRepository.findById(gymId)

    if (!gym) {
      throw new ResourceNotFoundError()
    }

    const distanceOfGym = getDistanceBetweenCoordinates(
      { latitude: userLatitude, longitude: userLongitude },
      { latitude: gym.latitude, longitude: gym.longitude },
    )

    const MAX_DISTANCE = 0.1 // KM

    if (distanceOfGym > MAX_DISTANCE) {
      throw new Error()
    }

    const hasCheckInTheSameDate =
      await this.checkInRepository.findByUserIdOnDate(userId, new Date())

    if (hasCheckInTheSameDate) {
      throw new Error()
    }

    const checkin = await this.checkInRepository.create({
      user_id: userId,
      gym_id: gymId,
    })

    return { checkin }
  }
}
