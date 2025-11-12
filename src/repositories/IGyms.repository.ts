import type { Gym, Prisma } from "generated/prisma/client.ts";

export interface IGymsRepository {
  findById(id: string): Promise<Gym | null>;
  searchMany(query: string, page: number): Promise<Gym[]>;
  create(data: Prisma.GymCreateInput): Promise<Gym>;
}
