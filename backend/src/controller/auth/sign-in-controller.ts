import { BadRequestError } from "@/http/routes/__errors/bad-request-error.js";
import { makeSignInUseCase } from "@/use-cases/factories/make-sign-in-use-case.js";
import { FastifyReply, FastifyRequest } from "fastify";

export class SignInController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { email, password } = request.body as {
      email: string;
      password: string;
    };

    try {
      const signInUseCase = makeSignInUseCase();
      const result = await signInUseCase.execute({ email, password });

      return reply.status(201).send(result);
    } catch (error) {
      if (error instanceof BadRequestError) {
        return reply
          .status(400)
          .send({ error: error.message, code: "BAD_REQUEST" });
      }
    }
  }
}
