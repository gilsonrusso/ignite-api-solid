import { app } from "@/app.ts";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user.ts";
import request from "supertest";
import { afterAll, beforeEach, describe, expect, it } from "vitest";

describe("Search Gyms (e2e)", () => {
  beforeEach(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should to be able to search gyms", async () => {
    const { token } = await createAndAuthenticateUser({ app, isAdmin: true });

    await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Javascript Gym",
        description: "",
        phone: "",
        latitude: -3.094189,
        longitude: -60.0223885,
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
      .get("/gyms/search")
      .query({ q: "Javascript" })
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body).toHaveLength(1);
    expect(response.body).toEqual([
      expect.objectContaining({
        title: "Javascript Gym",
      }),
    ]);
  });
});
