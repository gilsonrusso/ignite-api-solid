import type { ICheckInRepository } from "@/repositories/ICheck-ins.repository.ts";
import type { CheckIn } from "generated/prisma/browser.ts";

interface ListUserCheckInsHistoryUseCaseRequest {
  userId: string;
  page: number;
}
type ListUserCheckInsHistoryUseCaseResponse = {
  checkIns: CheckIn[];
};

export class ListUserCheckInsHistoryUseCase {
  constructor(private readonly checkInsRepository: ICheckInRepository) {}

  async execute({
    userId,
    page,
  }: ListUserCheckInsHistoryUseCaseRequest): Promise<ListUserCheckInsHistoryUseCaseResponse> {
    const checkIns = await this.checkInsRepository.findManyByUserId(
      userId,
      page,
    );

    return { checkIns };
  }
}
