import { app } from "@/app.ts";
import { prismaClient } from "@/lib/prisma.ts";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user.ts";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Validate CheckIns (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });

  it("should be able to validate check-in", async () => {
    const { token } = await createAndAuthenticateUser({ app, isAdmin: true });

    const gym = await prismaClient.gym.create({
      data: {
        title: "Javascript Gym",
        latitude: -3.094189,
        longitude: -60.0223885,
      },
    });

    const user = await prismaClient.user.findFirstOrThrow();

    let checkIn = await prismaClient.checkIn.create({
      data: { gym_id: gym.id, user_id: user.id },
    });

    const response = await request(app.server)
      .patch(`/check-ins/${checkIn.id}/validate`)
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(response.statusCode).toEqual(204);

    checkIn = await prismaClient.checkIn.findUniqueOrThrow({
      where: {
        id: checkIn.id,
      },
    });

    expect(checkIn.validated_at).toEqual(expect.any(Date));
  });
});
