import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users.ts";
import { beforeEach, describe, expect, it } from "vitest";
import { ResourceNotFoundError } from "../errors/resource-not-found.error.ts";
import { GetUserProfileUseCase } from "./get-user-profile.ts";

describe("Register Use Case", () => {
  let usersRepository: InMemoryUsersRepository;
  let sut: GetUserProfileUseCase;

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new GetUserProfileUseCase(usersRepository);
  });

  it("should be able to get a user by id", async () => {
    const userCreated = await usersRepository.create({
      name: "John Doe",
      email: "johndoe@exameple.com",
      password_hash: "123456",
    });

    const { user } = await sut.execute({
      id: userCreated.id,
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("should not be able to get an existent user", async () => {
    await expect(() =>
      sut.execute({
        id: "unexist-user",
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
