export type Gym = {
  id: string
  title: string
  description?: string | null
  phone?: string | null
  latitude: number
  longitude: number
  created_at: Date | string
}

export type GymCreateInput = Omit<Gym, 'id' | 'created_at'>

export interface GymsRepository {
  create(data: GymCreateInput): Promise<Gym>
  findById(id: string): Promise<Gym | null>
}
