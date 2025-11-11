import type { Gym } from "generated/prisma/client.ts";
import type { GymCreateInput } from "generated/prisma/models.ts";

export interface IGymsRepository {
  findById(id: string): Promise<Gym | null>;
  create(data: GymCreateInput): Promise<Gym>;
}
