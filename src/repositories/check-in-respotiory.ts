export interface CheckIn {
  id: string
  user_id: string
  gym_id: string
  validated_at?: Date | string | null
  created_at: Date
}

export type CheckInCreateInput = Omit<CheckIn, 'id' | 'created_at'>

export interface CheckInRepository {
  create(data: CheckInCreateInput): Promise<CheckIn>
  findByUserIdOnDate(
    user_id: string,
    date: string | Date,
  ): Promise<CheckIn | null>
}
