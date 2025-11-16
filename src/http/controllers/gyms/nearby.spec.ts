import { app } from "@/app.ts";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user.ts";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Nearby Gyms (e2e)", () => {
  const userLat = -3.1124314;
  const userLog = -60.0375103;
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });

  it("should be able to liet nearby gyms", async () => {
    const { token } = await createAndAuthenticateUser({ app });

    await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Javascript Gym",
        description: "",
        phone: "",
        latitude: userLat,
        longitude: userLog,
      });
    await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Typescript Gym",
        description: "",
        phone: "",
        latitude: -3.094189,
        longitude: -60.0223885,
      });

    const response = await request(app.server)
      .get("/gyms/nearby")
      .query({ latitude: userLat, longitude: userLog })
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(response.statusCode).toEqual(200);
  });
});
