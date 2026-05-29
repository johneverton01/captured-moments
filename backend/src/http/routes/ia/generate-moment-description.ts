import { authMiddleware } from "@/http/middleware/auth.js";
import { gemini } from "@/lib/gemini/index.js";
import { ErrorSchema } from "@/schemas/error-schemas.js";
import { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";


export async function generateMomentDescription(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(authMiddleware)
    .post(
      "/generate-moment-description",
      {
        schema: {
          tags: ["IA"],
          summary:
            "Generate a description for a moment based on the provided description",
          body: z.object({
            description: z.string().min(1, "Description is required"),
          }),
          response: {
            200: z.object({
              textGenerated: z.string(),
            }),
            400: ErrorSchema,
            500: ErrorSchema,
          },
        },
      },
      async (request, reply) => {
        const { description } = request.body;

        try {

          const ia = gemini
          const CONTENT_GENERATION_PROMPT = `Melhore a seguinte frase e 
          acrescente mais detalhes de uma forma resumida: "${description}".
          Eu não quero que em sua resposta contenha mais nenhuma outra informação além da descrição melhorada.
          Nem uma apresentação ou algo do tipo, apenas a resposta com a descrição melhorada.`;

          const completion = await ia.models.generateContent({
            model: "gemini-3.1-flash-lite",
            contents: CONTENT_GENERATION_PROMPT
          });

          if (!completion.text) {
            return reply.status(400).send({
              error: "Failed to generate description, try again later.",
              code: "GENERATION_FAILED",
            });
          }

          return reply.status(200).send({
            textGenerated: completion.text,
          });
        } catch (error) {
          console.error("Error generating description:", error);
          return reply.status(500).send({
            error: "Internal server error, try again later.",
            code: "INTERNAL_SERVER_ERROR",
          });
        }
      },
    );
}
