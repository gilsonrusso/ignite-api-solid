import { prismaClient } from "@/lib/prisma.ts";
import type { ICoordinates } from "@/types/coordinates.ts";
import type { Gym } from "generated/prisma/client.ts";
import type { GymCreateInput } from "generated/prisma/models.ts";
import type { IGymsRepository } from "../IGymsRepository.ts";

export class PrismaGymsRepository implements IGymsRepository {
  async findById(id: string) {
    const gym = await prismaClient.gym.findUnique({ where: { id } });

    return gym;
  }

  async findManyNearby({ latitude, longitude }: ICoordinates) {
    const gyms = await prismaClient.$queryRaw<Gym[]>`
        SELECT * from gyms
        WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10
    `;

    return gyms;
  }

  async searchMany(query: string, page: number) {
    const gyms = await prismaClient.gym.findMany({
      where: {
        title: {
          contains: query,
        },
      },
      take: 20,
      skip: (page - 1) * 20,
    });

    return gyms;
  }

  async create(data: GymCreateInput) {
    const gym = await prismaClient.gym.create({ data });

    return gym;
  }
}
