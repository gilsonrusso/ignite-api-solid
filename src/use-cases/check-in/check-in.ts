import type { ICheckInRepository } from "@/repositories/ICheckInsRepository.ts";
import type { IGymsRepository } from "@/repositories/IGymsRepository.ts";
import { getDistanceBetweenCoordinates } from "@/utils/get-distance-between-coordinates.ts";
import type { CheckIn } from "generated/prisma/browser.ts";
import { MaxDistanceError } from "../errors/max-distance-error.ts";
import { MaxNumberOfCheckInsError } from "../errors/max-number-0f-check-ins-error.ts";
import { ResourceNotFoundError } from "../errors/resource-not-found.error.ts";

interface CheckInUseCaseRequest {
  userId: string;
  gymId: string;
  userLatitude: number;
  userLongitude: number;
}
type CheckInUseCaseResponse = {
  checkIn: CheckIn;
};

export class CheckInUseCase {
  constructor(
    private readonly checkInsRepository: ICheckInRepository,
    private readonly gymsRepository: IGymsRepository,
  ) {}

  async execute({
    userId,
    gymId,
    userLatitude,
    userLongitude,
  }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
    const gym = await this.gymsRepository.findById(gymId);

    if (!gym) {
      throw new ResourceNotFoundError();
    }

    const distance = getDistanceBetweenCoordinates({
      from: {
        latitude: userLatitude,
        longitude: userLongitude,
      },
      to: {
        latitude: gym.latitude,
        longitude: gym.longitude,
      },
    });

    const MAX_DISTANCE_IN_KM = 0.1;

    if (distance > MAX_DISTANCE_IN_KM) {
      throw new MaxDistanceError();
    }

    const checkInOnSameDay = await this.checkInsRepository.findByUserIdOnDate(
      userId,
      new Date(),
    );

    if (checkInOnSameDay) {
      throw new MaxNumberOfCheckInsError();
    }

    const checkIn = await this.checkInsRepository.create({
      gym_id: gymId,
      user_id: userId,
    });

    return { checkIn };
  }
}
