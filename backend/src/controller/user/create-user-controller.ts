import { BadRequestError } from "@/http/routes/__errors/bad-request-error.js";
import { makeCreateUserUseCase } from "@/use-cases/factories/make-create-user-use-case.js";
import { FastifyReply, FastifyRequest } from "fastify";

interface CreateUserRequestBody {
  name: string;
  email: string;
  password: string;
}

export class CreateUserController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { name, email, password } = request.body as CreateUserRequestBody;

    try {
      const createUserUseCase = makeCreateUserUseCase();
      const result = await createUserUseCase.execute({ name, email, password });

      return reply.status(201).send(result);
    } catch (error) {
      if (error instanceof BadRequestError) {
        return reply
          .status(400)
          .send({ error: error.message, code: "BAD_REQUEST" });
      }
      return reply
        .status(500)
        .send({
          error: "Internal Server Error",
          code: "INTERNAL_SERVER_ERROR",
        });
    }
  }
}
