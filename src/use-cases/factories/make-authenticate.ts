import { PrismaUserRepository } from "@/repositories/prisma/prisma-users.ts";
import { AuthenticateUseCase } from "../authenticate/authenticate.ts";

export function makeAuthenticateUseCase() {
  const usersRepository = new PrismaUserRepository();
  const authenticateUseCase = new AuthenticateUseCase(usersRepository);

  return authenticateUseCase;
}
