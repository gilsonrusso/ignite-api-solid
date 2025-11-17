import { app } from "@/app.ts";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user.ts";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Create Gyms (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to create a gym", async () => {
    const { token } = await createAndAuthenticateUser({ app, isAdmin: true });

    const respose = await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Javascript Gym",
        description: "",
        phone: "",
        latitude: -3.094189,
        longitude: -60.0223885,
      });

    expect(respose.statusCode).toEqual(201);
  });
});
