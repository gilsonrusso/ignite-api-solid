import { prismaClient } from "../lib/prisma.ts";

interface RegisterUseCaseRequest {
  name: string;
  email: string;
}

export async function registerUseCase({ email, name }: RegisterUseCaseRequest) {
  const userWithSameEmail = await prismaClient.user.findUnique({
    where: {
      email,
    },
  });

  if (userWithSameEmail) {
    throw new Error("E-mail already registered.");
  }

  const user = await prismaClient.user.create({
    data: {
      name,
      email,
    },
  });

  return user;
}
