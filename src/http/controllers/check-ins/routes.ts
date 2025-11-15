import { verifyJWT } from "@/http/middlewares/verify-jwt.ts";
import type { FastifyInstance } from "fastify";
import { createCheckInController } from "./create.ts";
import { historyCheckInsController } from "./history.ts";
import { metricsCheckInsController } from "./metrics.ts";
import { validateCheckInController } from "./validate.ts";

export async function ckeckInsRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJWT);

  app.post("/check-ins/:gymId/check-ins", createCheckInController);
  app.patch("/check-ins/:checkInId/validate", validateCheckInController);
  app.patch("/check-ins/history", historyCheckInsController);
  app.patch("/check-ins/metrics", metricsCheckInsController);
}
