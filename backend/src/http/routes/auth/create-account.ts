import { CreateUserController } from "@/controller/user/create-user-controller.js";
import { ErrorSchema } from "@/schemas/error-schemas.js";
import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

export async function createAccount(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/create-account",
    {
      schema: {
        tags: ["Auth"],
        summary: "Create a new user account",
        body: z.object({
          name: z.string().min(1),
          email: z.email(),
          password: z.string().min(8),
        }),
        response: {
          201: z.object({
            user: z.object({
              name: z.string(),
              email: z.string(),
            }),
            accessToken: z.string(),
            message: z.string(),
          }),
          400: ErrorSchema,
          500: ErrorSchema,
        },
      },
    },
    async (request, reply) => {
      return new CreateUserController().handle(request, reply);     
    }
  );
}
