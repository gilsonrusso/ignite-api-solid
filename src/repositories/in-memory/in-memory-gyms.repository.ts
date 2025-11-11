import type { Gym } from "generated/prisma/client.ts";
import type { GymCreateInput } from "generated/prisma/models.ts";
import { randomUUID } from "node:crypto";
import type { IGymsRepository } from "../IGyms.repository.ts";

export class InMemoryGymsRepository implements IGymsRepository {
  public items: Gym[] = [];

  async create(data: GymCreateInput) {
    const gym: Gym = {
      id: randomUUID(),
      title: data.title,
      description: data.description ?? null,
      phone: data.phone ?? null,
      latitude: data.latitude,
      longitude: data.longitude,
    };

    this.items.push(gym);

    return gym;
  }

  async findById(id: string) {
    const gym = this.items.find((item) => item.id === id);

    if (!gym) {
      return null;
    }

    return gym;
  }
}
