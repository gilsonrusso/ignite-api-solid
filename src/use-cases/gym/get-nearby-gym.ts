import type { IGymsRepository } from "@/repositories/IGyms.ts";
import type { Gym } from "generated/prisma/client.ts";

interface GetNearbyGymsUseCaseRequest {
  userLatitude: number;
  userLongitude: number;
}
interface GetNearbyGymsUseCaseResponse {
  gyms: Gym[];
}

export class GetNearbyGymsUseCase {
  constructor(private readonly gymRepository: IGymsRepository) {}

  async execute({
    userLatitude,
    userLongitude,
  }: GetNearbyGymsUseCaseRequest): Promise<GetNearbyGymsUseCaseResponse> {
    const gyms = await this.gymRepository.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude,
    });

    return { gyms };
  }
}
