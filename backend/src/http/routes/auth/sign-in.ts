import { SignInController } from "@/controller/auth/sign-in-controller.js";
import { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

export async function signIn(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/sign-in",
    {
      schema: {
        tags: ["Auth"],
        summary: "Sign in to an existing user account",
        body: z.object({
          email: z.email(),
          password: z.string().min(8),
        }),
        response: {
          200: z.object({
            accessToken: z.string(),
            user: z.object({
              name: z.string(),
              email: z.string(),
            }),
            message: z.string(),
          }),
          400: z.object({
            message: z.string(),
          }),
          500: z.null(),
        },
      },
    },
    async (request, reply) => {
      return new SignInController().handle(request, reply);
    },
  );
}
