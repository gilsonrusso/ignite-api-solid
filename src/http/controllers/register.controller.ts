import { FastifyReply, FastifyRequest } from 'fastify';
import z from 'zod';
import { registerUseCase } from '../../use-cases/register.use-cases.js';

export async function registerController(request: FastifyRequest, reply: FastifyReply) {
  const registerUserSchema = z.object({
    name: z.string(),
    email: z.email(),
    password: z.string().min(6),
  });

  const { name, email, password } = registerUserSchema.parse(request.body);

  try {
    await registerUseCase({
      name,
      email,
      password,
    });
  } catch (error) {
    return reply.status(409).send({ message: (error as Error).message });
  }

  return reply.status(201).send();
}
