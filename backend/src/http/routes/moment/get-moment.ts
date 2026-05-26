import { GetMomentController } from '@/controller/moment/get-moment-controller.js';
import { authMiddleware } from '@/http/middleware/auth.js';
import { ErrorSchema } from '@/schemas/error-schemas.js';
import { MomentResponseSchema } from '@/schemas/moment-schemas.js';
import { FastifyInstance } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod';

export async function getMoment(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>()
  .register(authMiddleware)
  .get(
    '/moment',
    {
      schema: {
          tags: ['Moment'],
          summary: 'Get moments for the authenticated user',
          response: {
            200: z.array(MomentResponseSchema),
            401: ErrorSchema,
            500: ErrorSchema,
          }
        }
    },
    async (request, reply) => {
      return new GetMomentController().handle(request, reply);
     }
  );
}