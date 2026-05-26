import { SignInUseCase } from "@/use-cases/auth/sign-in-use-case.js";
import { FastifyReply, FastifyRequest } from "fastify";

export class SignInController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { email, password } = request.body as {
      email: string;
      password: string;
    };

    try {
      const signInUseCase = new SignInUseCase();
      const result = await signInUseCase.execute({email, password });

      return reply.status(201).send(result);
    } catch (error) {
      return reply.status(400).send({ message: (error as Error).message });
    }
  }
}