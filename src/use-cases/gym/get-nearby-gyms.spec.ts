import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms.ts";
import { beforeEach, describe, expect, it } from "vitest";
import { GetNearbyGymsUseCase } from "./get-nearby-gym.ts";

describe("Get Nearby Gyms Use Case", () => {
  let gymsRepository: InMemoryGymsRepository;
  let sut: GetNearbyGymsUseCase;

  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new GetNearbyGymsUseCase(gymsRepository);
  });

  it("should be able to get nearby gyms", async () => {
    await gymsRepository.create({
      title: "Near Gym",
      description: "",
      phone: "",
      latitude: -3.094189,
      longitude: -60.0223885,
    });
    await gymsRepository.create({
      title: "Far Gym",
      description: "",
      phone: "",
      latitude: -2.975223,
      longitude: -60.015811,
    });

    const { gyms } = await sut.execute({
      userLatitude: -3.094189,
      userLongitude: -60.0223885,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([expect.objectContaining({ title: "Near Gym" })]);
  });
});
