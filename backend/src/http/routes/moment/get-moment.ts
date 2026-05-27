import { MomentSchema } from '@/entities/moment/moment-entity.js';
import { authMiddleware } from '@/http/middleware/auth.js';
import { ErrorSchema } from '@/schemas/error-schemas.js';
import { makeGetMomentUseCase } from '@/use-cases/factories/make-get-moment-use-case.js';
import { FastifyInstance } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';
import { UnauthorizedError } from '../__errors/unauthorized-error.js';

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
            200: MomentSchema.array(),
            401: ErrorSchema,
            500: ErrorSchema,
          }
        }
    },
    async (request, reply) => {
      const userId = await request.getCurrentUserId();

      if (!userId) {
        throw new UnauthorizedError("Unauthorized");
      }

      const getMomentUseCase = makeGetMomentUseCase();
       const moments = await getMomentUseCase.execute({ userId });
       return reply.status(200).send(moments);
     }
  );
}