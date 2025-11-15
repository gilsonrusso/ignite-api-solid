import { makeGetNearbyGymsUseCase } from "@/use-cases/factories/makeGetNearbyGymsUseCase.ts";
import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function nearbyGymsController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const nearbyGymsQuerySchema = z.object({
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90;
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180;
    }),
  });

  const { latitude, longitude } = nearbyGymsQuerySchema.parse(request.query);

  const getNearbyGymsUseCase = makeGetNearbyGymsUseCase();

  await getNearbyGymsUseCase.execute({
    userLatitude: latitude,
    userLongitude: longitude,
  });

  return reply.status(201).send();
}
