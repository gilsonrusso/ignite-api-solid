import { PrismaUserRepository } from "@/repositories/prisma/prisma-users.repository.ts";
import { AuthenticateUseCase } from "../authenticate/authenticate.use-case.ts";

export function makeAuthenticateUseCase() {
  const usersRepository = new PrismaUserRepository();
  const authenticateUseCase = new AuthenticateUseCase(usersRepository);

  return authenticateUseCase;
}
