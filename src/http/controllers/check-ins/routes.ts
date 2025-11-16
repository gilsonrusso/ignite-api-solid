import { verifyJWT } from "@/http/middlewares/verify-jwt.ts";
import { verifyUserRole } from "@/http/middlewares/verify-user-role.ts";
import type { FastifyInstance } from "fastify";
import { createCheckInController } from "./create.ts";
import { historyCheckInsController } from "./history.ts";
import { metricsCheckInsController } from "./metrics.ts";
import { validateCheckInController } from "./validate.ts";

export async function ckeckInsRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJWT);

  app.post("/check-ins/:gymId/check-ins", createCheckInController);
  app.patch(
    "/check-ins/:checkInId/validate",
    { onRequest: [verifyUserRole("ADMIN")] },
    validateCheckInController,
  );
  app.get("/check-ins/history", historyCheckInsController);
  app.get("/check-ins/metrics", metricsCheckInsController);
}
