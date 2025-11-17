import type { ICheckInRepository } from "@/repositories/ICheckInsRepository.ts";
import dayjs from "dayjs";
import type { CheckIn } from "generated/prisma/browser.ts";
import { LateCheckInValidationError } from "../errors/late-check-in-validation.error.ts";
import { ResourceNotFoundError } from "../errors/resource-not-found.error.ts";

interface ValidateCheckInUseCaseRequest {
  checkInId: string;
}
type ValidateCheckInUseCaseResponse = {
  checkIn: CheckIn;
};

export class ValidateCheckInUseCase {
  constructor(private readonly checkInsRepository: ICheckInRepository) {}

  async execute({
    checkInId,
  }: ValidateCheckInUseCaseRequest): Promise<ValidateCheckInUseCaseResponse> {
    const checkIn = await this.checkInsRepository.findById(checkInId);

    if (!checkIn) {
      throw new ResourceNotFoundError();
    }

    const distanceInMinutesFromCheckInCreated = dayjs(new Date()).diff(
      checkIn.created_at,
      "minutes",
    );

    if (distanceInMinutesFromCheckInCreated > 20) {
      throw new LateCheckInValidationError();
    }

    checkIn.validated_at = new Date();

    await this.checkInsRepository.save(checkIn);

    return { checkIn };
  }
}
