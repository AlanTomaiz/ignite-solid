export type User = {
  id: string
  name: string
  email: string
  password_hash: string
  created_at: Date | string
}

export type UserCreateInput = Omit<User, 'id' | 'created_at'>

export interface UserRepository {
  create(data: UserCreateInput): Promise<User>
  findById(id: string): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
}
