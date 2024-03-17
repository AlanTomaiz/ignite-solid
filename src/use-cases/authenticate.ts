import { InvalidCredentialsError } from '@/errors/invalid-credentials'
import { UserRepository } from '@/repositories/user-repository'
import { compare } from 'bcryptjs'

interface AuthenticateRequest {
  email: string
  password: string
}

export class AuthenticateUseCase {
  constructor(private usersRepository: UserRepository) {}

  async execute({ email, password }: AuthenticateRequest) {
    const user = await this.usersRepository.findByEmail(email)
    if (!user) {
      throw new InvalidCredentialsError()
    }

    const doestPasswordMatches = await compare(password, user.password_hash)
    if (!doestPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    return { user }
  }
}
