import { makeSearchGymsUseCase } from "@/use-cases/factories/makeSearchGymsUseCase.ts";
import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function searchController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const searchGymsBodySchema = z.object({
    q: z.string(),
    page: z.coerce.number().min(1).default(1),
  });

  const { q, page } = searchGymsBodySchema.parse(request.body);

  const searchGymUseCase = makeSearchGymsUseCase();

  const { gyms } = await searchGymUseCase.execute({
    query: q,
    page,
  });

  return reply.status(200).send(gyms);
}
