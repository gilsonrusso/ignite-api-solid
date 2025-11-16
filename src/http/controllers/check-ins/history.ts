import { makeListUserChekcInsHistoryUseCase } from "@/use-cases/factories/makeListUserCheckInsHistoryUseCase.ts";
import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function historyCheckInsController(
  request: FastifyRequest,
  replay: FastifyReply,
) {
  const historyCheckInsQuerySchema = z.object({
    page: z.coerce.number().default(1),
  });

  const { page } = historyCheckInsQuerySchema.parse(request.query);

  const historyCheckInsUseCase = makeListUserChekcInsHistoryUseCase();

  const { checkIns } = await historyCheckInsUseCase.execute({
    userId: request.user.sub,
    page,
  });

  return replay.status(200).send({ checkIns });
}
