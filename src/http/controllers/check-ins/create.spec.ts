import { app } from "@/app.ts";
import { prismaClient } from "@/lib/prisma.ts";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user.ts";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("CheckIns (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });

  it("should be able to create check-in", async () => {
    const { token } = await createAndAuthenticateUser({ app, isAdmin: true });

    const gym = await prismaClient.gym.create({
      data: {
        title: "Javascript Gym",
        latitude: -3.094189,
        longitude: -60.0223885,
      },
    });

    const response = await request(app.server)
      .post(`/check-ins/${gym.id}/check-ins`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        latitude: -3.094189,
        longitude: -60.0223885,
      });

    expect(response.statusCode).toEqual(201);
  });
});
