import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod";
import { getRegistersController } from "./controllers/getRegisters.controller.ts";
import { registerController } from "./controllers/register.controller.ts";

export const appRoutes: FastifyPluginCallbackZod = (app) => {
  app.post("/users", registerController);
  app.get("/users", getRegistersController);
};
