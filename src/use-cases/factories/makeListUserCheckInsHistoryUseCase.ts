import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins.repository.ts";
import { ListUserCheckInsHistoryUseCase } from "../check-in/list-user-check-ins-history.ts";

export function makeListUserChekcInsHistoryUseCase() {
  const checkInsRepostitory = new PrismaCheckInsRepository();
  const useCase = new ListUserCheckInsHistoryUseCase(checkInsRepostitory);

  return useCase;
}
