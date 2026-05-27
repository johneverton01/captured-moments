import { UpdateMomentController } from '@/controller/moment/update-moment-controller.js';
import { MomentSchema } from '@/entities/moment/moment-entity.js';
import { authMiddleware } from '@/http/middleware/auth.js';
import { ErrorSchema } from '@/schemas/error-schemas.js';
import { UpdateMomentBodySchema } from "@/schemas/moment-schemas.js";
import { FastifyInstance } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';
import z from 'zod';


export async function updateMoment(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>()
  .register(authMiddleware)
  .put(
    '/moment/:id',
    {
      schema: {
          tags: ['Moment'],
          summary: 'Update an existing moment',
          body: UpdateMomentBodySchema,
          params: z.object({
            id: z.uuid(),
          }),
          response: {
            201: MomentSchema,
            400: ErrorSchema,
            401: ErrorSchema,
            500: ErrorSchema,
          }
      }
    },
    async (request, reply) => {
      return new UpdateMomentController().handle(request, reply);
    }
  );
}