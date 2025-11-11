import fastifyCors from "@fastify/cors";
import fastify from "fastify";
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from "fastify-type-provider-zod";
import { ZodError } from "zod";
import { env } from "./env/index.ts";
import { appRoutes } from "./http/routes.ts";

export const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(fastifyCors, {
  origin: "*",
});

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

app.get("/health", (_, replay) => {
  return replay.status(200).send({ message: "API OK" });
});

app.register(appRoutes);

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
