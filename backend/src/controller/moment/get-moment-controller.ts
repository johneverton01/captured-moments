import { UnauthorizedError } from '@/http/routes/__errors/unauthorized-error.js';
import { makeGetMomentUseCase } from '@/use-cases/factories/make-get-moment-use-case.js';
import { FastifyReply, FastifyRequest } from 'fastify';

export class GetMomentController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const userId = await request.getCurrentUserId();
   
    if (!userId) {
      throw new UnauthorizedError("Unauthorized")
    }

    try {
      const getMomentUseCase = makeGetMomentUseCase();
      const moments = await getMomentUseCase.execute({ userId });
      return reply.status(200).send(moments);
    } catch (error) {
      return reply.status(500).send({ error: 'Failed to get moments' });
    }
  }
}