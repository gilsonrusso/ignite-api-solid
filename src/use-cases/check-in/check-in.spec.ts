import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins.ts";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms.ts";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { MaxDistanceError } from "../errors/max-distance-error.ts";
import { MaxNumberOfCheckInsError } from "../errors/max-number-0f-check-ins-error.ts";
import { CheckInUseCase } from "./check-in.ts";

const userLat = -3.1124314;
const userLog = -60.0375103;

describe("Check In Use Case", () => {
  let checkInRepository: InMemoryCheckInsRepository;
  let gymsRepository: InMemoryGymsRepository;
  let sut: CheckInUseCase;

  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInsRepository();
    gymsRepository = new InMemoryGymsRepository();
    sut = new CheckInUseCase(checkInRepository, gymsRepository);

    await gymsRepository.create({
      id: "gym-01",
      title: "Javascript Gym",
      description: "",
      phone: "",
      latitude: userLat,
      longitude: userLog,
    });

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should be able to check in", async () => {
    const { checkIn } = await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: userLat,
      userLongitude: userLog,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("should not be able to check in twice in the same day", async () => {
    vi.setSystemTime(new Date(2025, 0, 20, 8, 0, 0));

    await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: userLat,
      userLongitude: userLog,
    });

    await expect(() =>
      sut.execute({
        gymId: "gym-01",
        userId: "user-01",
        userLatitude: userLat,
        userLongitude: userLog,
      }),
    ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError);
  });
  it("should be able to check in twice but in different days", async () => {
    vi.setSystemTime(new Date(2025, 0, 20, 8, 0, 0));

    await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: userLat,
      userLongitude: userLog,
    });

    vi.setSystemTime(new Date(2025, 0, 21, 8, 0, 0));

    const { checkIn } = await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: userLat,
      userLongitude: userLog,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });
  it("should not be able to check in on distant gym", async () => {
    await gymsRepository.create({
      id: "gym-02",
      title: "Javascript Gym",
      description: "",
      phone: "",
      latitude: -3.094189,
      longitude: -60.0223885,
    });

    await expect(() =>
      sut.execute({
        gymId: "gym-02",
        userId: "user-01",
        userLatitude: userLat,
        userLongitude: userLog,
      }),
    ).rejects.toBeInstanceOf(MaxDistanceError);
  });
});
