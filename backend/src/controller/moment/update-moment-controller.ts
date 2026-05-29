import { BadRequestError } from "@/http/routes/__errors/bad-request-error.js";
import { makeUpdateMomentUseCase } from "@/use-cases/factories/make-update-moment-use-case.js";
import { FastifyReply, FastifyRequest } from "fastify";

export class UpdateMomentController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { title, story, imageUrl, visitedDate, visitedLocation, } = request.body as {
      title: string;
      story: string;
      imageUrl: string;
      visitedDate: string;
      visitedLocation?: string[];
    };

    const { id } = request.params as { id: string };

    try {

      const userId = await request.getCurrentUserId();
      const updateMomentUseCase = makeUpdateMomentUseCase();
      const dateFormatted = new Date(visitedDate);
    
      const result = await updateMomentUseCase.execute(id, {
        title,
        story,
        imageUrl,
        visitedDate: dateFormatted,
        visitedLocation,
        userId,
      });

      return reply.status(200).send(
       result,
      );
      
    } catch (error) {
      console.error("Error updating moment:", error);
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