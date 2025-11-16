import fastifyCookie from "@fastify/cookie";
import fastifyCors from "@fastify/cors";
import fastifyJwt from "@fastify/jwt";
import fastify from "fastify";
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from "fastify-type-provider-zod";
import { ZodError } from "zod";
import { env } from "./env/index.ts";
import { ckeckInsRoutes } from "./http/controllers/check-ins/routes.ts";
import { gymsRoutes } from "./http/controllers/gyms/routes.ts";
import { usersRoutes } from "./http/controllers/users/routes.ts";

export const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: "refreshToken",
    signed: false,
  },
  sign: {
    expiresIn: "10m",
  },
});

app.register(fastifyCookie);

app.register(fastifyCors, {
  origin: "*",
});

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

app.get("/health", (_, replay) => {
  return replay.status(200).send({ message: "API OK" });
});

app.register(usersRoutes);
app.register(gymsRoutes);
app.register(ckeckInsRoutes);

app.setErrorHandler((error, _request, replay) => {
  if (error instanceof ZodError) {
    replay
      .status(400)
      .send({ message: "Validation error.", issues: error.issues });
  }

  if (env.NODE_ENV !== "production") {
    console.error(error);
  } else {
    // o erro pode ser enviado para alguma ferramenta de logs.
  }

  return replay.status(500).send({ message: "Internal server error." });
});
