import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users.repository.ts";
import { hash } from "bcryptjs";
import { beforeEach, describe, expect, it } from "vitest";
import { InvalidCredentialsError } from "../errors/invalid-credentials.error.ts";
import { AuthenticateUseCase } from "./authenticate.use-case.ts";

describe("Authenticate Use Case", () => {
  let usersRepository: InMemoryUsersRepository;
  let sut: AuthenticateUseCase;

  beforeEach(async () => {
    usersRepository = new InMemoryUsersRepository();
    sut = new AuthenticateUseCase(usersRepository);

    await usersRepository.create({
      name: "John Doe",
      email: "johndoe@exameple.com",
      password_hash: await hash("123456", 6),
    });
  });

  it("should be able to authenticate", async () => {
    const { user } = await sut.execute({
      email: "johndoe@exameple.com",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String));
  });
  it("should not be authenticate with wrong email", async () => {
    await expect(() =>
      sut.execute({
        email: "invalid@example.com",
        password: "123456",
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
  it("should not be authenticate with wrong password", async () => {
    await expect(() =>
      sut.execute({
        email: "johndoe@exameple.com",
        password: "1234567",
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
