import { CreateUserUseCase } from "@/use-cases/user/CreateUserUseCase.js";
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
      const createUserUseCase = new CreateUserUseCase();
      const result = await createUserUseCase.execute({ name, email, password });

      return reply.status(201).send(result);
    } catch (error) {
      
    }
  }
}