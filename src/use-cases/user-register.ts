import { UserAlreadyExistsError } from '@/errors/user-already-exists'
import { UserRepository } from '@/repositories/user-repository'
import { hash } from 'bcryptjs'

interface RegisterRequest {
  name: string
  email: string
  password: string
}

export class RegisterUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({ name, email, password }: RegisterRequest) {
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await this.userRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    const user = await this.userRepository.create({
      name,
      email,
      password_hash,
    })

    return { ...user }
  }
}
