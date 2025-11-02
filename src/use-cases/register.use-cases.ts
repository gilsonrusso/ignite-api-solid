import { hash } from 'bcryptjs';
import { prisma } from '../lib/prisma.js';

interface RegisterUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

export async function registerUseCase({ email, name, password }: RegisterUseCaseRequest) {
  const userWithSameEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (userWithSameEmail) {
    throw new Error('E-mail already registered.');
  }

  const password_hash = await hash(password, 6);

  await prisma.user.create({
    data: {
      name,
      email,
      password_hash,
    },
  });
}
