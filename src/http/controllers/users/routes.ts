import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod";
import { verifyJWT } from "../../middlewares/verify-jwt.ts";
import { authenticateController } from "./authenticate.controller.ts";
import { profile } from "./profile.controller.ts";
import { refreshController } from "./refresh.controller.ts";
import { registerController } from "./register.controller.ts";

export const usersRoutes: FastifyPluginCallbackZod = (app) => {
  app.post("/users", registerController);
  app.post("/sessions", authenticateController);

  app.patch("/token/refresh", refreshController);

  /** Authenticated Routes  */
  app.get("/me", { onRequest: [verifyJWT] }, profile);
};
