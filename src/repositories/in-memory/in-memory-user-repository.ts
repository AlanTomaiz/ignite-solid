import { randomUUID } from 'node:crypto'
import { User, UserCreateInput, UsersRepository } from '../users-repository'

export class InMemoryUsersRepository implements UsersRepository {
  public users: User[] = []

  async create(data: UserCreateInput) {
    const user = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      created_at: new Date(),
    }

    this.users.push(user)

    return user
  }

  async findById(id: string) {
    const user = this.users.find((row) => row.id === id)

    if (!user) {
      return null
    }

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
