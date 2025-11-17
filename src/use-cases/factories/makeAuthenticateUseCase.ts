import { PrismaUserRepository } from "@/repositories/prisma/prisma-users.repository.ts";
import { AuthenticateUseCase } from "../authenticate/authenticate.ts";

export function makeAuthenticateUseCase() {
  const usersRepository = new PrismaUserRepository();
  const useCase = new AuthenticateUseCase(usersRepository);

  return useCase;
}
