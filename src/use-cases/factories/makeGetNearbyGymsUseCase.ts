import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms.repository.ts";
import { GetNearbyGymsUseCase } from "../gym/get-nearby-gym.ts";

export function makeGetNearbyGymsUseCase() {
  const gymsRepostitory = new PrismaGymsRepository();
  const useCase = new GetNearbyGymsUseCase(gymsRepostitory);

  return useCase;
}
