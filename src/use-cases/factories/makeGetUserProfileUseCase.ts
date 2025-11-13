import { PrismaUserRepository } from "@/repositories/prisma/prisma-users.repository.ts";
import { GetUserProfileUseCase } from "../register/get-user-profile.ts";

export function makeGetUserProfileUseCase() {
  const usersRepository = new PrismaUserRepository();
  const useCase = new GetUserProfileUseCase(usersRepository);

  return useCase;
}
