import { InvalidCredentialsError } from "@/use-cases/errors/invalid-credentials.error.ts";
import { makeAuthenticateUseCase } from "@/use-cases/factories/makeAuthenticateUseCase.ts";
import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function authenticateController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateBodySchema = z.object({
    email: z.email(),
    password: z.string().min(6),
  });

  const { email, password } = authenticateBodySchema.parse(request.body);

  try {
    const authenticateUseCase = makeAuthenticateUseCase();

    const user = await authenticateUseCase.execute({
      email,
      password,
    });

    return reply.status(200).send({
      user,
    });
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: error.message });
    }

    throw error;
  }
}
