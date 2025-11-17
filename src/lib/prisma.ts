import { PrismaClient } from "generated/prisma/client.ts";
import { env } from "../env/index.ts";

export const prismaClient = new PrismaClient({
  log: env.NODE_ENV === "development" ? ["query"] : [],
});
