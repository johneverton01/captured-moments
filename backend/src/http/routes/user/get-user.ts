import { GetUserController } from "@/controller/user/GetUserController.js";
import { authMiddleware } from "@/http/middleware/auth.js";
import { ErrorSchema } from "@/schemas/error-schemas.js";
import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

export async function getUser(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>()
  .register(authMiddleware)
  .get(
    "/user",
    {
      schema: {
        tags: ["User"],
        summary: "Get user information",
        response: {
          200: z.object({
            name: z.string(),
            email: z.string(),
            id: z.string()
          }),
          400: ErrorSchema,
          500: ErrorSchema
        },
      },
    },
    async (request, reply) => {
      return new GetUserController().handle(request, reply);
    }
  );
}