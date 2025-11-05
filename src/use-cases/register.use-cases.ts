import { prisma } from '../lib/prisma.js';

interface RegisterUseCaseRequest {
  name: string;
  email: string;
}

export async function registerUseCase({ email, name }: RegisterUseCaseRequest) {
  const userWithSameEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (userWithSameEmail) {
    throw new Error('E-mail already registered.');
  }

  const user = await prisma.user.create({
    data: {
      name,
      email,
    },
  });

  return user;
}
