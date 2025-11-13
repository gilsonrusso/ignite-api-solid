import { PrismaUserRepository } from "@/repositories/prisma/prisma-users.ts";
import { RegisterUseCase } from "../register/register.ts";

export function makeRegisterUseCase() {
  const usersRepository = new PrismaUserRepository();
  const registerUseCase = new RegisterUseCase(usersRepository);

  return registerUseCase;
}
