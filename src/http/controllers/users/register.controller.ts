import { UserAlreadyExistsError } from "@/use-cases/errors/user-already-exists.error.ts";
import { makeRegisterUseCase } from "@/use-cases/factories/makeRegisterUseCase.ts";
import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export const registerBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
});

type RegisterBody = z.infer<typeof registerBodySchema>;

export async function registerController(
  request: FastifyRequest<{ Body: RegisterBody }>,
  reply: FastifyReply,
) {
  const { name, email, password } = request.body;

  try {
    const registerUseCase = makeRegisterUseCase();

    await registerUseCase.execute({
      name,
      email,
      password,
    });

    return reply.status(201).send();
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: error.message });
    }

    throw error;
  }
}
