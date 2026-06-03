import { authMiddleware } from "@/http/middleware/auth.js";
import { ErrorSchema } from "@/schemas/error-schemas.js";
import { ImageSchemas } from "@/schemas/image-schemas.js";
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

export async function uploadImage(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>()
  .register(authMiddleware)
  .post(
    "/upload-image",
    {
      schema: {
        tags: ["Image"],
        summary: "Upload an image",
        body: z.object({
          file: ImageSchemas,
        }),
        response: {
          200: z.object({
            url: z.string(),
          }),
          400: ErrorSchema,
          500: ErrorSchema,
        },
      },
    },
    async (request, reply) => {
      const { file } = request.body;
      const userId = request.getCurrentUserId();

      if (!userId) {
        return reply.status(400).send({ error: "Unauthorized", code: "UNAUTHORIZED" });
      }

      if (!file) {
        return reply.status(400).send({ error: "File is required", code: "FILE_REQUIRED" });
      }

      return { url: "https://example.com/path-to-uploaded-image.jpg" };
    }
  );
}