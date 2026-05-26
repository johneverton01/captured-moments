import { BadRequestError } from "@/http/routes/__errors/bad-request-error.js";
import { CreateMomentUseCase } from "@/use-cases/moment/create-moment-use-case.js";
import { FastifyReply, FastifyRequest } from "fastify";

export class CreateMomentController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { title, story, imageUrl, visitedDate, visitedLocation, } = request.body as {
      title: string;
      story: string;
      imageUrl: string;
      visitedDate: string;
      visitedLocation?: string[];
    };

    try {

      const userId = await request.getCurrentUserId();
      const createMomentUseCase = new CreateMomentUseCase();
      const dateFormatted = new Date(visitedDate);
    
      const result = await createMomentUseCase.execute({
        title,
        story,
        imageUrl,
        visitedDate: dateFormatted,
        visitedLocation,
        userId,
      });

      return reply.status(201).send({ 
       ...result,
        visitedDate: result.visitedDate.toISOString(),
      });
      
    } catch (error) {
      if (error instanceof BadRequestError) {
        return reply.status(400).send({ error: error.message, code: "BAD_REQUEST" });
      }

      return reply.status(500).send({
        error: "Internal Server Error",
        code: "INTERNAL_SERVER_ERROR"
      });
    }
  }
}