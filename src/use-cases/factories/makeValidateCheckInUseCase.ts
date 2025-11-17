import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins.repository.ts";
import { ValidateCheckInUseCase } from "../check-in/validate-check-in.ts";

export function makeValidateCheckInUseCase() {
  const checkInsRepostitory = new PrismaCheckInsRepository();
  const useCase = new ValidateCheckInUseCase(checkInsRepostitory);

  return useCase;
}
