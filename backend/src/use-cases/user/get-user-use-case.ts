import { BadRequestError } from "@/http/routes/__errors/bad-request-error.js";
import { prisma } from "@/lib/prisma/index.js";

interface getUserRequestDTO {
  id: string;
}

interface getUserResponseDTO {
  name: string;
  email: string;
  id: string;
}



export class GetUserUseCase {
  async execute(input: getUserRequestDTO): Promise<getUserResponseDTO> {
    const user = await prisma.user.findUnique({
      where: {
        id: input.id,
      },
    });

    if (!user) {
      throw new BadRequestError("User not found");
    }

    return {
      name: user.name,
      email: user.email,
      id: user.id,
    };
  }
}