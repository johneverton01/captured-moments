import { CreateUserUseCase } from "@/use-cases/user/CreateUserUseCase.js";
import { FastifyReply, FastifyRequest } from "fastify";

export class CreateUserController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { name, email, password } = request.body as {
      name: string;
      email: string;
      password: string;
    };

    try {
      const createUserUseCase = new CreateUserUseCase();
      const result = await createUserUseCase.execute({ name, email, password });

      return reply.status(201).send(result);
    } catch (error) {
      
    }
  }
}