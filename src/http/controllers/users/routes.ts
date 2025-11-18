import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { verifyJWT } from "../../middlewares/verify-jwt.ts";
import {
  authenticateBodySchema,
  authenticateController,
} from "./authenticate.controller.ts";
import { profile } from "./profile.controller.ts";
import { refresh } from "./refresh.controller.ts";
import {
  registerBodySchema,
  registerController,
} from "./register.controller.ts";

const AUTH_TAG = "Autenticação";

export const usersRoutes = (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/users",
    {
      schema: {
        tags: [AUTH_TAG],
        summary: "Cria uma nova conta de usuário",
        body: registerBodySchema,
        // response: {
        //   201: {
        //     description: "Usuário criado com sucesso.",
        //   },
        //   409: {
        //     description: "Conflito. E-mail já existe.",
        //   },
        // },
      },
    },
    registerController,
  );
  app.post(
    "/sessions",
    {
      schema: {
        tags: [AUTH_TAG],
        summary: "Autentica um usuário e retorna um token JWT",
        body: authenticateBodySchema,
        // response: {
        //   200: {
        //     description: "Usuário autenticado com sucesso.",
        //     type: "object",
        //     properties: {
        //       token: { type: "string" },
        //     },
        //   },
        //   400: {
        //     description: "Credenciais inválidas.",
        //   },
        // },
      },
    },
    authenticateController,
  );

  app.patch(
    "/token/refresh",
    {
      schema: {
        tags: [AUTH_TAG],
        summary: "Atualiza o token de acesso (Refresh Token)",
        parameters: [
          {
            name: "refreshToken",
            in: "cookie",
            required: true,
            description:
              "Token de atualização (refresh token) obtido no login.",
            schema: { type: "string" },
          },
        ],
        // response: {
        //   200: {
        //     description: "Novo token de acesso (JWT) gerado.",
        //     type: "object",
        //     properties: {
        //       token: { type: "string" },
        //     },
        //   },
        //   401: {
        //     description:
        //       "Não autorizado. O refresh token pode estar ausente ou ser inválido.",
        //   },
        // },
      },
    },
    refresh,
  );

  /** Authenticated Routes  */
  app.get("/me", { onRequest: [verifyJWT] }, profile);
};
