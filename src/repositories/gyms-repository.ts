export type Gym = {
  id: string
  title: string
  description?: string
  phone?: string
  latitude: number
  longitude: number
  created_at: Date | string
}

export type GymCreateInput = Omit<Gym, 'id' | 'created_at'>

export interface GymsRepository {
  findById(id: string): Promise<Gym | null>
}
