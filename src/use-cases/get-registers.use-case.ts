import type { User } from "generated/prisma/client.ts";
import { prismaClient } from "../lib/prisma.ts";

interface RegisterUseCaseResponse {
  users: User[];
}

export async function getRegistersUseCase(): Promise<RegisterUseCaseResponse> {
  const users = await prismaClient.user.findMany({ take: 10 });

  return { users };
}
