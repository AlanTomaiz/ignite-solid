import { Paginated } from '@/@types/global'
import { Decimal } from '@prisma/client/runtime/library'

export type Gym = {
  id: string
  title: string
  description?: string | null
  phone?: string | null
  latitude: number | Decimal
  longitude: number | Decimal
  created_at: Date | string
}

export type GymCreateInput = Omit<Gym, 'id' | 'created_at'>

export interface FindManyNearbyParams {
  latitude: number
  longitude: number
}

export interface GymsRepository {
  create(data: GymCreateInput): Promise<Gym>
  findManyNearby(params: FindManyNearbyParams): Promise<Gym[]>
  findById(id: string): Promise<Gym | null>
  searchMany(query: string, options: Paginated): Promise<Gym[]>
}
