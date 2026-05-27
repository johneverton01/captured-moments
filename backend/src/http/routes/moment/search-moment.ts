import { MomentSchema } from '@/entities/moment/moment-entity.js';
import { authMiddleware } from '@/http/middleware/auth.js';
import { ErrorSchema } from '@/schemas/error-schemas.js';
import { makeSearchMomentUseCase } from '@/use-cases/factories/make-search-moment-use-case.js';
import { FastifyInstance } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { UnauthorizedError } from '../__errors/unauthorized-error.js';

export async function searchMoment(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>()
  .register(authMiddleware)
  .get(
    '/moment/search',
    {
      schema: {
          tags: ['Moment'],
          summary: 'Search moments for the authenticated user',
          querystring: z.object({
              search: z.string(),
              page: z.string().optional(),
            }),
          response: {
            200: MomentSchema.array(),
            401: ErrorSchema,
            500: ErrorSchema,
          }
        }
    },
    async (request, reply) => {
      const userId = await request.getCurrentUserId();
      const { search, page } = request.query;
      

      if (!userId) {
        throw new UnauthorizedError("Unauthorized");
      }

      if (search && search.trim() === "") {
        return reply.status(200).send([]);
      }

      const searchMomentUseCase = makeSearchMomentUseCase();
      const moments = await searchMomentUseCase.execute(
        { 
          userId, 
          searchTerm: search, 
          page 
        });
      return reply.status(200).send(moments);
    }
  );
}