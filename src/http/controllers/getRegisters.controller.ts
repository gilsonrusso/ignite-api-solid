import { getUserProfileUseCase } from "@/use-cases/register/get-user-profile.ts";
import type { FastifyReply, FastifyRequest } from "fastify";

export async function getRegistersController(
  _request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const users = await getUserProfileUseCase();

    return reply.status(200).send(users);
  } catch (error) {
    return reply.status(409).send({ message: (error as Error).message });
  }
}
