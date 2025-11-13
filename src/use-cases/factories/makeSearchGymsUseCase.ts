import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms.repository.ts";
import { SearchGymUseCase } from "../gym/search-gym.ts";

export function makeSearchGymsUseCase() {
  const gymsRepostitory = new PrismaGymsRepository();
  const useCase = new SearchGymUseCase(gymsRepostitory);

  return useCase;
}
