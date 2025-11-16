import { app } from "@/app.ts";
import { prismaClient } from "@/lib/prisma.ts";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user.ts";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("History CheckIns (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });

  it("should be able to list check-in history", async () => {
    const { token } = await createAndAuthenticateUser({ app });

    const gym = await prismaClient.gym.create({
      data: {
        title: "Javascript Gym",
        latitude: -3.094189,
        longitude: -60.0223885,
      },
    });

    const user = await prismaClient.user.findFirstOrThrow();

    await prismaClient.checkIn.createMany({
      data: [
        { gym_id: gym.id, user_id: user.id },
        { gym_id: gym.id, user_id: user.id },
      ],
    });

    const response = await request(app.server)
      .get(`/check-ins/history`)
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body.checkIns).toEqual([
      expect.objectContaining({ gym_id: gym.id, user_id: user.id }),
      expect.objectContaining({ gym_id: gym.id, user_id: user.id }),
    ]);
  });
});
