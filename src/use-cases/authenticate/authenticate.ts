import type { IUsersRepository } from "@/repositories/IUser.ts";
import { compare } from "bcryptjs";
import type { User } from "generated/prisma/client.ts";
import { InvalidCredentialsError } from "../errors/invalid-credentials.error.ts";

interface AuthenticateUseCaseRequest {
  email: string;
  password: string;
}
type AuthenticateUseCaseResponse = {
  user: User;
};

export class AuthenticateUseCase {
  constructor(private readonly userRepository: IUsersRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new InvalidCredentialsError();
    }

    const doesPasswordMatches = await compare(password, user.password_hash);

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError();
    }

    return { user };
  }
}
