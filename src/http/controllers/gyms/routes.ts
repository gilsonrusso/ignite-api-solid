import { verifyJWT } from "@/http/middlewares/verify-jwt.ts";
import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod";

export const gymsRoutes: FastifyPluginCallbackZod = (app) => {
  app.addHook("onRequest", verifyJWT);
};
