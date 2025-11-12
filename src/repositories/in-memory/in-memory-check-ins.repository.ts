import dayjs from "dayjs";
import type { CheckIn } from "generated/prisma/client.ts";
import type { CheckInUncheckedCreateInput } from "generated/prisma/models.ts";
import { randomUUID } from "node:crypto";
import type { ICheckInRepository } from "../ICheck-ins.repository.ts";

export class InMemoryCheckInsRepository implements ICheckInRepository {
  public items: CheckIn[] = [];

  async countByUserId(userId: string) {
    return this.items.filter((item) => item.user_id === userId).length;
  }

  async findManyByUserId(userId: string, page: number) {
    return this.items
      .filter((item) => item.user_id === userId)
      .slice((page - 1) * 20, page * 20);
  }

  async findByUserIdOnDate(userId: string, date: Date) {
    const startOfTheDay = dayjs(date).startOf("date");
    const endOfTheDay = dayjs(date).endOf("date");

    const ckeckInOnSameDate = this.items.find((checkIn) => {
      const checkInDate = dayjs(checkIn.created_at);

      const isOnSameDate =
        checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay);

      return checkIn.user_id === userId && isOnSameDate;
    });

    if (!ckeckInOnSameDate) {
      return null;
    }

    return ckeckInOnSameDate;
  }

  async create(data: CheckInUncheckedCreateInput) {
    const checkIn: CheckIn = {
      id: randomUUID(),
      user_id: data.user_id,
      gym_id: data.gym_id,
      created_at: new Date(),
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
    };

    this.items.push(checkIn);

    return checkIn;
  }
}
