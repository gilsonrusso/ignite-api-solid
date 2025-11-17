import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins.repository.ts";
import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms.repository.ts";
import { CheckInUseCase } from "../check-in/check-in.ts";

export function makeCheckInUseCase() {
  const checkInsRepostitory = new PrismaCheckInsRepository();
  const gymsRepostitory = new PrismaGymsRepository();
  const useCase = new CheckInUseCase(checkInsRepostitory, gymsRepostitory);

  return useCase;
}
