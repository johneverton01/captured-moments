import { UnauthorizedError } from '@/http/routes/__errors/unauthorized-error.js';
import { makeSearchMomentUseCase } from '@/use-cases/factories/make-search-moment-use-case.js';
import { FastifyReply, FastifyRequest } from 'fastify';

export class SearchMomentController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const userId = await request.getCurrentUserId();
   
    if (!userId) {
      throw new UnauthorizedError("Unauthorized")
    }

    try {
      const searchMomentUseCase = makeSearchMomentUseCase();
      const moments = await searchMomentUseCase.execute({ userId });
      return reply.status(200).send(moments);
    } catch (error) {
      return reply.status(500).send({ error: 'Failed to get moments' });
    }
  }
}