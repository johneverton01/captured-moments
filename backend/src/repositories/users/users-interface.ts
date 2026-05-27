import type { User, UserCreateInput } from '@/entities/user/user-entity.js';
import { IBaseRepository } from '../base-repository.js';

interface loginCredentials {
  email: string;
}

export interface IUsersRepository extends IBaseRepository<User, UserCreateInput> {
  create(data: UserCreateInput): Promise<User>;
  findByEmail(data: loginCredentials): Promise<User | undefined>;
}
