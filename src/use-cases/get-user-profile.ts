import { ResourceNotFoundError } from '@/errors/resource-not-found'
import { UserRepository } from '@/repositories/user-repository'

interface GetUserProfileRequest {
  userId: string
}

export class GetUserProfileUseCase {
  constructor(private userRespository: UserRepository) {}

  async execute({ userId }: GetUserProfileRequest) {
    const user = await this.userRespository.findById(userId)
    if (!user) {
      throw new ResourceNotFoundError()
    }

    return { user }
  }
}
