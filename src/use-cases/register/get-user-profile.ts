import type { IUsersRepository } from "@/repositories/IUserRepository.ts";
import type { User } from "generated/prisma/client.ts";
import { ResourceNotFoundError } from "../errors/resource-not-found.error.ts";

interface GetUserProfileUseCaseRequest {
  id: string;
}
interface GetUserProfileUseCaseResponse {
  user: User;
}

export class GetUserProfileUseCase {
  constructor(private readonly userRepository: IUsersRepository) {}

  async execute({
    id,
  }: GetUserProfileUseCaseRequest): Promise<GetUserProfileUseCaseResponse> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new ResourceNotFoundError();
    }

    return { user };
  }
}
