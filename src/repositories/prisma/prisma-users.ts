import { prismaClient } from "@/lib/prisma.ts";
import type { Prisma } from "generated/prisma/client.ts";
import type { IUsersRepository } from "../IUser.ts";

export class PrismaUserRepository implements IUsersRepository {
  async findByEmail(email: string) {
    const user = await prismaClient.user.findUnique({ where: { email } });

    return user;
  }
  async create(data: Prisma.UserCreateInput) {
    const user = await prismaClient.user.create({
      data,
    });

    return user;
  }
}
