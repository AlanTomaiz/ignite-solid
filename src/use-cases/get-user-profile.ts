import { ResourceNotFoundError } from '@/errors/resource-not-found'
import { UsersRepository } from '@/repositories/users-repository'

interface GetUserProfileRequest {
  userId: string
}

export class GetUserProfileUseCase {
  constructor(private userRespository: UsersRepository) {}

  async execute({ userId }: GetUserProfileRequest) {
    const user = await this.userRespository.findById(userId)
    if (!user) {
      throw new ResourceNotFoundError()
    }

    return { user }
  }
}
