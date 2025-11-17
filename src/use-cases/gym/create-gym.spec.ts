import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms.ts";
import { beforeEach, describe, expect, it } from "vitest";
import { CreateGymUseCase } from "./create-gym.ts";

describe("Gym Use Case", () => {
  let gymsRepository: InMemoryGymsRepository;
  let sut: CreateGymUseCase;

  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new CreateGymUseCase(gymsRepository);
  });

  it("should be able to create a gym", async () => {
    const { gym } = await sut.execute({
      title: "Javascript Gym",
      description: "",
      phone: "",
      latitude: -3.094189,
      longitude: -60.0223885,
    });

    expect(gym.id).toEqual(expect.any(String));
  });
});
