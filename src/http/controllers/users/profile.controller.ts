import { makeGetUserProfileUseCase } from "@/use-cases/factories/makeGetUserProfileUseCase.ts";
import type { FastifyReply, FastifyRequest } from "fastify";

export async function profile(request: FastifyRequest, replay: FastifyReply) {
  const getUserProfile = makeGetUserProfileUseCase();

  const { user } = await getUserProfile.execute({
    id: request.user.sub,
  });

  return replay.status(200).send({
    user: {
      ...user,
      password_hash: undefined,
    },
  });
}
