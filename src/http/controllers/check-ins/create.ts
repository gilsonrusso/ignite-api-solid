import { makeCheckInUseCase } from "@/use-cases/factories/makeCheckInUseCase.ts";
import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function createCheckInController(
  request: FastifyRequest,
  replay: FastifyReply,
) {
  const createCheckInParamsSchema = z.object({
    gymId: z.uuid(),
  });

  const createCheckInBodySchema = z.object({
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90;
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180;
    }),
  });

  const { gymId } = createCheckInParamsSchema.parse(request.params);
  const { latitude, longitude } = createCheckInBodySchema.parse(request.body);

  const createCheckInUseCase = makeCheckInUseCase();

  const { checkIn } = await createCheckInUseCase.execute({
    gymId,
    userId: request.user.sub,
    userLatitude: latitude,
    userLongitude: longitude,
  });

  return replay.status(201).send(checkIn);
}
