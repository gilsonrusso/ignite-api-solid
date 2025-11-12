import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms.repository.ts";
import { beforeEach, describe, expect, it } from "vitest";
import { SearchGymUseCase } from "./search-gym.use-case.ts";

describe("Search Gyms Use Case", () => {
  let gymsRepository: InMemoryGymsRepository;
  let sut: SearchGymUseCase;

  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new SearchGymUseCase(gymsRepository);
  });

  it("should be able to search for gyms", async () => {
    await gymsRepository.create({
      title: "Javascript Gym",
      description: "",
      phone: "",
      latitude: -3.094189,
      longitude: -60.0223885,
    });
    await gymsRepository.create({
      title: "Python Gym",
      description: "",
      phone: "",
      latitude: -3.094189,
      longitude: -60.0223885,
    });

    const { gyms } = await sut.execute({
      query: "Javascript",
      page: 1,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([
      expect.objectContaining({ title: "Javascript Gym" }),
    ]);
  });
  it("should be able to get a list paginated of gyms", async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `Javascript Gym ${i}`,
        description: "",
        phone: "",
        latitude: -3.094189,
        longitude: -60.0223885,
      });
    }

    // console.log(gymsRepository.items);

    const { gyms } = await sut.execute({
      query: "Javascript",
      page: 2,
    });

    expect(gyms).toHaveLength(2);
    expect(gyms).toEqual([
      expect.objectContaining({ title: "Javascript Gym 21" }),
      expect.objectContaining({ title: "Javascript Gym 22" }),
    ]);
  });
});
