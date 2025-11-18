import { InvalidCredentialsError } from "@/use-cases/errors/invalid-credentials.error.ts";
import { makeAuthenticateUseCase } from "@/use-cases/factories/makeAuthenticateUseCase.ts";
import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export const authenticateBodySchema = z.object({
  email: z.email(),
  password: z.string().min(6),
});

type AuthenticateBodySchema = z.infer<typeof authenticateBodySchema>;

export async function authenticateController(
  request: FastifyRequest<{ Body: AuthenticateBodySchema }>,
  reply: FastifyReply,
) {
  const { email, password } = request.body;

  try {
    const authenticateUseCase = makeAuthenticateUseCase();

    const { user } = await authenticateUseCase.execute({
      email,
      password,
    });

    const token = await reply.jwtSign(
      {
        role: user.role,
      },
      {
        sign: { sub: user.id },
      },
    );
    const refreshToken = await reply.jwtSign(
      {
        role: user.role,
      },
      {
        sign: { sub: user.id, expiresIn: "7d" },
      },
    );

    return reply
      .setCookie("refreshToken", refreshToken, {
        path: "/",
        secure: true,
        sameSite: true,
        httpOnly: true,
      })
      .status(200)
      .send({
        token,
      });
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: error.message });
    }

    throw error;
  }
}
