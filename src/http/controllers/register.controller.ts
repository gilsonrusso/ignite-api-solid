import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { registerUseCase } from "../../use-cases/register.use-cases.ts";

export async function registerController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerUserSchema = z.object({
    name: z.string(),
    email: z.email(),
  });

  const { name, email } = registerUserSchema.parse(request.body);

  try {
    const user = await registerUseCase({
      name,
      email,
    });

    return reply.status(201).send({
      user,
    });
  } catch (error) {
    return reply.status(409).send({ message: (error as Error).message });
  }
}
