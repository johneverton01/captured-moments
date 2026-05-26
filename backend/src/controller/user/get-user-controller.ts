import { BadRequestError } from "@/http/routes/__errors/bad-request-error.js";
import { GetUserUseCase } from "@/use-cases/user/get-user-use-case.js";
import type { FastifyReply, FastifyRequest } from "fastify";


export class GetUserController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const userId = await request.getCurrentUserId();

    console.log("User ID from request:", userId);
    try {
      const user = await new GetUserUseCase().execute({ id: userId });
      return reply.status(200).send(user);
    }
    catch (error) {
      if (error instanceof BadRequestError) {
        return reply.status(400).send({ error: error.message, code: "BAD_REQUEST" });
      }
      return reply.status(500).send({ error: "Internal Server Error", code: "INTERNAL_SERVER_ERROR" });
    }
  }
}