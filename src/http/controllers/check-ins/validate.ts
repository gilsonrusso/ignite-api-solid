import { makeValidateCheckInUseCase } from "@/use-cases/factories/makeValidateCheckInUseCase.ts";
import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function validateCheckInController(
  request: FastifyRequest,
  replay: FastifyReply,
) {
  const validateCheckInParamsSchema = z.object({
    checkInId: z.string(),
  });

  const { checkInId } = validateCheckInParamsSchema.parse(request.params);

  const validateCheckInUseCase = makeValidateCheckInUseCase();

  await validateCheckInUseCase.execute({
    checkInId,
  });

  return replay.status(204).send();
}
