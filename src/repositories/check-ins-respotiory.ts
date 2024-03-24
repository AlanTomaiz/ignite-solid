export interface CheckIn {
  id: string
  user_id: string
  gym_id: string
  validated_at?: Date | string | null
  created_at: Date
}

export interface Paginated {
  page: number
  limit: number
}

export type CheckInCreateInput = Omit<CheckIn, 'id' | 'created_at'>

export interface CheckInsRepository {
  create(data: CheckInCreateInput): Promise<CheckIn>
  findByUserIdOnDate(user_id: string, date: Date): Promise<CheckIn | null>
  fetchUserHistory(user_id: string, options: Paginated): Promise<CheckIn[]>
}
