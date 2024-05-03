enum Role {
  ADMIN,
  MEMBER,
}

export type User = {
  id: string
  name: string
  email: string
  password_hash: string
  role: Role
  created_at: Date | string
}

export type UserCreateInput = Omit<User, 'id' | 'created_at'>

export interface UsersRepository {
  create(data: UserCreateInput): Promise<User>
  findById(id: string): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
}
