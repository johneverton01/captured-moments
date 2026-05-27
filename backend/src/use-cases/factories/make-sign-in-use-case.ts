import { UsersRepository } from "@/repositories/users/users-repository.js";
import { SignInUseCase } from "../auth/sign-in-use-case.js";

export function makeSignInUseCase() {
  const usersRepository = new UsersRepository();
  const useCase = new SignInUseCase(usersRepository);
  return useCase;
}