import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins.repository.ts";
import { beforeEach, describe, expect, it } from "vitest";
import { ListUserCheckInsHistoryUseCase } from "./list-user-check-ins-history.use-case.ts";

describe("List User Check-ins History Use Case", () => {
  let checkInRepository: InMemoryCheckInsRepository;
  let sut: ListUserCheckInsHistoryUseCase;

  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInsRepository();
    sut = new ListUserCheckInsHistoryUseCase(checkInRepository);
  });

  it("should be able to list check-in history", async () => {
    await checkInRepository.create({
      gym_id: "gym-01",
      user_id: "user-01",
    });
    await checkInRepository.create({
      gym_id: "gym-02",
      user_id: "user-01",
    });

    const { checkIns } = await sut.execute({
      userId: "user-01",
      page: 1,
    });

    expect(checkIns).toHaveLength(2);
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: "gym-01" }),
      expect.objectContaining({ gym_id: "gym-02" }),
    ]);
  });
  it("should be able to get a list paginated of check-in history", async () => {
    for (let i = 1; i <= 22; i++) {
      await checkInRepository.create({
        gym_id: `gym-${i}`,
        user_id: "user-01",
      });
    }

    // console.log(checkInRepository.items);

    const { checkIns } = await sut.execute({
      userId: "user-01",
      page: 2,
    });

    expect(checkIns).toHaveLength(2);
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: "gym-21" }),
      expect.objectContaining({ gym_id: "gym-22" }),
    ]);
  });
});
