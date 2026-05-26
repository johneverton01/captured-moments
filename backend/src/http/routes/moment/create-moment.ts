import { CreateMomentController } from '@/controller/moment/create-moment-controller.js';
import { authMiddleware } from '@/http/middleware/auth.js';
import { ErrorSchema } from '@/schemas/error-schemas.js';
import { CreateMomentBodySchema, CreateMomentResponseSchema } from "@/schemas/moment-schemas.js";
import { FastifyInstance } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';


export async function createMoment(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>()
  .register(authMiddleware)
  .post(
    '/moment',
    {
      schema: {
          tags: ['Moment'],
          summary: 'Create a new moment',
          body: CreateMomentBodySchema,
          response: {
            201: CreateMomentResponseSchema,
            400: ErrorSchema,
            401: ErrorSchema,
            500: ErrorSchema,
          }
      }
    },
    async (request, reply) => {
      return new CreateMomentController().handle(request, reply);
    }
  );
}