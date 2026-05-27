import type { IUsersRepository } from "@/repositories/users/users-interface.js";
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
  constructor(private usersRepository: IUsersRepository) {}
  async execute(data: CreateUserDTO): Promise<CreateUserResponse> {
    const { name, email, password } = data;

    const userAlreadyExists = await this.usersRepository.findByEmail({ email });

    if (userAlreadyExists) {
      throw new UserAlreadyExistsError();
    }

    const hashedPassword = await cryptPassword(password);

    const user = await this.usersRepository.create({
        name,
        email,
        password: hashedPassword,
    });

    const accessToken = signJWT( user.id! );

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
