import { prismaClient } from "@/lib/prisma.ts";
import { hash } from "bcryptjs";
import type { FastifyInstance } from "fastify";
import request from "supertest";

export async function createAndAuthenticateUser({
  app,
  isAdmin = false,
}: {
  app: FastifyInstance;
  isAdmin?: boolean;
}) {
  await prismaClient.user.create({
    data: {
      name: "John Doe",
      email: "johndoe@example.com",
      password_hash: await hash("123456", 6),
      role: isAdmin ? "ADMIN" : "MEMBER",
    },
  });

  const authResponse = await request(app.server).post("/sessions").send({
    email: "johndoe@example.com",
    password: "123456",
  });

  const { token } = authResponse.body;

  return { token };
}
