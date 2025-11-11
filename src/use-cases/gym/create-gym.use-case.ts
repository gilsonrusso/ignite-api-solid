import type { IGymsRepository } from "@/repositories/IGyms.repository.ts";
import type { Gym } from "generated/prisma/client.ts";

interface CreateGymUseCaseRequest {
  title: string;
  description: string;
  phone: string;
  latitude: number;
  longitude: number;
}
interface CreateGymUseCaseResponse {
  gym: Gym;
}

export class CreateGymUseCase {
  constructor(private readonly gymRepository: IGymsRepository) {}

  async execute({
    title,
    description,
    phone,
    latitude,
    longitude,
  }: CreateGymUseCaseRequest): Promise<CreateGymUseCaseResponse> {
    const gym = await this.gymRepository.create({
      title,
      description,
      phone,
      latitude,
      longitude,
    });

    return { gym };
  }
}
