import { UsersRepository } from '@/repositories/users/users-repository.js';
import { CreateUserUseCase } from '../user/create-user-use-case.js';

export function makeCreateUserUseCase() {
  const usersRepository = new UsersRepository();
  const useCase = new CreateUserUseCase(usersRepository);
  return useCase;
}