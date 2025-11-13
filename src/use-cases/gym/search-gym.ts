import type { IGymsRepository } from "@/repositories/IGymsRepository.ts";
import type { Gym } from "generated/prisma/client.ts";

interface SearchGymUseCaseRequest {
  query: string;
  page: number;
}
interface SearchGymUseCaseResponse {
  gyms: Gym[];
}

export class SearchGymUseCase {
  constructor(private readonly gymRepository: IGymsRepository) {}

  async execute({
    query,
    page,
  }: SearchGymUseCaseRequest): Promise<SearchGymUseCaseResponse> {
    const gyms = await this.gymRepository.searchMany(query, page);

    return { gyms };
  }
}
