import { Gym, GymsRepository } from '../gyms-repository'

export class InMemoryGymsRepository implements GymsRepository {
  public gyms: Gym[] = []

  async findById(id: string) {
    const gym = this.gyms.find((row) => row.id === id)

    if (!gym) {
      return null
    }

    return gym
  }
}
