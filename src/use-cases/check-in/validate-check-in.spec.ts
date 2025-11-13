import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins.ts";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { LateCheckInValidationError } from "../errors/late-check-in-validation.error.ts";
import { ResourceNotFoundError } from "../errors/resource-not-found.error.ts";
import { ValidateCheckInUseCase } from "./validate-check-in.ts";

describe("Validate Check In Use Case", () => {
  let checkInRepository: InMemoryCheckInsRepository;
  let sut: ValidateCheckInUseCase;

  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInsRepository();
    sut = new ValidateCheckInUseCase(checkInRepository);

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should be able to validate check in", async () => {
    const createdCheckIn = await checkInRepository.create({
      gym_id: "gym-01",
      user_id: "user-01",
    });

    const { checkIn } = await sut.execute({
      checkInId: createdCheckIn.id,
    });

    expect(checkIn.validated_at).toEqual(expect.any(Date));
  });
  it("should not be able to validate an inexistent check in", async () => {
    await expect(() =>
      sut.execute({
        checkInId: "inexistent-01",
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
  it("should not be able to validate an inexistent check in after 20 minutes of its created", async () => {
    vi.setSystemTime(new Date(2025, 0, 1, 13, 40));

    const createdCheckIn = await checkInRepository.create({
      gym_id: "gym-01",
      user_id: "user-01",
    });

    const twentyOneMinutesInMs = 1000 * 60 * 21;
    vi.advanceTimersByTime(twentyOneMinutesInMs);

    await expect(() =>
      sut.execute({
        checkInId: createdCheckIn.id,
      }),
    ).rejects.toBeInstanceOf(LateCheckInValidationError);
  });
});
