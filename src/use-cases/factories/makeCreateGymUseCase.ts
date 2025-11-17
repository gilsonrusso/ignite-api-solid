import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms.repository.ts";
import { CreateGymUseCase } from "../gym/create-gym.ts";

export function makeCreateGymUseCase() {
  const gymsRepostitory = new PrismaGymsRepository();
  const useCase = new CreateGymUseCase(gymsRepostitory);

  return useCase;
}
