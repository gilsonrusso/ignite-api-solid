import { PrismaUserRepository } from "@/repositories/prisma/prisma-users.repository.ts";
import { RegisterUseCase } from "../register.use-cases.ts";

export function makeRegisterUseCase() {
    const usersRepository = new PrismaUserRepository();
    const registerUseCase = new RegisterUseCase(usersRepository);

    return registerUseCase
}