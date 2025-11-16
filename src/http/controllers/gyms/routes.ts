import { verifyJWT } from "@/http/middlewares/verify-jwt.ts";
import { verifyUserRole } from "@/http/middlewares/verify-user-role.ts";
import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod";
import { createController } from "./create.controller.ts";
import { nearbyGymsController } from "./nearby.controller.ts";
import { searchController } from "./search.controller.ts";

export const gymsRoutes: FastifyPluginCallbackZod = (app) => {
  app.addHook("onRequest", verifyJWT);

  app.get("/gyms/search", searchController);
  app.get("/gyms/nearby", nearbyGymsController);

  app.post("/gyms", { onRequest: [verifyUserRole("ADMIN")] }, createController);
};
