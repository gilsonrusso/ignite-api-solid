import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins.repository.ts";
import { GetUserMetricsUseCase } from "../check-in/get-user-metrics.ts";

export function makeGetUserMetricsUseCase() {
  const checkInsRepostitory = new PrismaCheckInsRepository();
  const useCase = new GetUserMetricsUseCase(checkInsRepostitory);

  return useCase;
}
