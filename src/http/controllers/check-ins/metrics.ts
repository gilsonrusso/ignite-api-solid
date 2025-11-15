import { makeGetUserMetricsUseCase } from "@/use-cases/factories/makeGetUserMetricsUseCase.ts";
import type { FastifyReply, FastifyRequest } from "fastify";

export async function metricsCheckInsController(
  request: FastifyRequest,
  replay: FastifyReply,
) {
  const getUserMetricsUseCase = makeGetUserMetricsUseCase();

  const { checkInsCount } = await getUserMetricsUseCase.execute({
    userId: request.user.sub,
  });

  return replay.status(200).send(checkInsCount);
}
