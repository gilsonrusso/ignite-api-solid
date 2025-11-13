import type { ICheckInRepository } from "@/repositories/ICheckInsRepository.ts";

interface GetUserMetricsUseCaseRequest {
  userId: string;
}
type GetUserMetricsUseCaseResponse = {
  checkInsCount: number;
};

export class GetUserMetricsUseCase {
  constructor(private readonly checkInsRepository: ICheckInRepository) {}

  async execute({
    userId,
  }: GetUserMetricsUseCaseRequest): Promise<GetUserMetricsUseCaseResponse> {
    const checkInsCount = await this.checkInsRepository.countByUserId(userId);

    return { checkInsCount };
  }
}
