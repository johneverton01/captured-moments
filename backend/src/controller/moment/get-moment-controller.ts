import { UnauthorizedError } from '@/http/routes/__errors/unauthorized-error.js';
import { GetMomentUseCase } from '@/use-cases/moment/get-moment-use-case.js';
import { FastifyReply, FastifyRequest } from 'fastify';

export class GetMomentController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const userId = await request.getCurrentUserId();
   
    if (!userId) {
      throw new UnauthorizedError("Unauthorized")
    }

    try {
      const getMomentUseCase = new GetMomentUseCase();
      const { moments } = await getMomentUseCase.execute({ userId });
      return reply.send(moments);
    } catch (error) {
      return reply.status(500).send({ error: 'Failed to get moments' });
    }
  }
}