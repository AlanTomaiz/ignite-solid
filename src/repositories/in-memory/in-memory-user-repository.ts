import { User, UserCreateInput, UserRepository } from '../user-repository'

export class InMemoryUserRepository implements UserRepository {
  public users: User[] = []
  async create(data: UserCreateInput) {
    const user = {
      id: 'user_1',
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      created_at: new Date(),
    }

    this.users.push(user)

    return user
  }

  async findByEmail(email: string) {
    const user = this.users.find((row) => row.email === email)

    if (!user) {
      return null
    }

    return user
  }
}
