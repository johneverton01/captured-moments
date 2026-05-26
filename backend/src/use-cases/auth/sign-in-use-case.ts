import { prisma } from "@/lib/prisma/index.js";
import { comparePassword } from "@/utils/bcrypt.js";
import { signJWT } from "@/utils/jwt.js";
import { InvalidCredentialsError } from "../__errors/invalid-credentials-error.js";

interface SignInRequest {
  email: string;
  password: string;
}

interface SignInResponse {
  accessToken: string;
  user: {
    name: string;
    email: string;
  };
  message: string;
}

export class SignInUseCase {
  async execute(data: SignInRequest): Promise<SignInResponse> {
      const { email, password } = data;

      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        throw new InvalidCredentialsError();
      }

      const isPasswordValid = await comparePassword(password, user.password);

      if (!isPasswordValid) {
        throw new InvalidCredentialsError();
      }

      const accessToken = signJWT(user.id);

      return {
        accessToken,
        user: {
          name: user.name,
          email: user.email,
        },
        message: "Sign-in successful",
      };
  }
}