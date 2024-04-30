export type Gym = {
  id: string
  title: string
  description?: string | null
  phone?: string | null
  latitude: number
  longitude: number
  created_at: Date | string
}

export interface Paginated {
  page: number
  limit: number
}

export type GymCreateInput = Omit<Gym, 'id' | 'created_at'>

export interface findManyNearbyParams {
  latitude: number
  longitude: number
}

export interface GymsRepository {
  create(data: GymCreateInput): Promise<Gym>
  findManyNearby(params: findManyNearbyParams): Promise<Gym[]>
  findById(id: string): Promise<Gym | null>
  searchMany(query: string, options: Paginated): Promise<Gym[]>
}
