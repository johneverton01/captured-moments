import { prisma } from "@/lib/prisma/index.js";
import { cryptPassword } from "@/utils/bcrypt.js";
import { signJWT } from "@/utils/jwt.js";
import { UserAlreadyExistsError } from "../__errors/user-already-exists-error.js";

interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
}

interface CreateUserResponse {
  user: {
    name: string;
    email: string;
  };
  accessToken: string;
  message: string;
}

export class CreateUserUseCase {
  async execute(data: CreateUserDTO): Promise<CreateUserResponse> {
    const { name, email, password } = data;

    const userAlreadyExists = await prisma.user.findUnique({
      where: { email },
    });

    if (userAlreadyExists) {
      throw new UserAlreadyExistsError();
    }

    const hashedPassword = await cryptPassword(password);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    const accessToken = signJWT( user.id );

    return {
      user: {
        name: user.name,
        email: user.email,
      },
      accessToken,
      message: "User created successfully",
    };
  }
}
