import { prismaClient } from "@/lib/prisma.ts";
import dayjs from "dayjs";
import type { CheckIn } from "generated/prisma/client.ts";
import type { CheckInUncheckedCreateInput } from "generated/prisma/models.ts";
import type { ICheckInRepository } from "../ICheckInsRepository.ts";

export class PrismaCheckInsRepository implements ICheckInRepository {
  async create(data: CheckInUncheckedCreateInput) {
    const checkIn = await prismaClient.checkIn.create({ data });

    return checkIn;
  }
  async findByUserIdOnDate(userId: string, date: Date) {
    const startOfTheDay = dayjs(date).startOf("date");
    const endOfTheDay = dayjs(date).endOf("date");

    const checkIn = await prismaClient.checkIn.findFirst({
      where: {
        user_id: userId,
        created_at: {
          gte: startOfTheDay.toDate(),
          lte: endOfTheDay.toDate(),
        },
      },
    });

    return checkIn;
  }
  async findManyByUserId(userId: string, page: number) {
    const checkIns = prismaClient.checkIn.findMany({
      where: {
        user_id: userId,
      },
      take: 20,
      skip: (page - 1) * 20,
    });
    return checkIns;
  }
  async findById(id: string) {
    const checkIn = await prismaClient.checkIn.findUnique({
      where: { id },
    });

    return checkIn;
  }
  async countByUserId(userId: string) {
    const count = await prismaClient.checkIn.count({
      where: {
        user_id: userId,
      },
    });

    return count;
  }
  async save(data: CheckIn) {
    const checkIn = await prismaClient.checkIn.update({
      where: {
        id: data.id,
      },
      data,
    });

    return checkIn;
  }
}
