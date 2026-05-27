import { UserSchema, type User, type UserCreateInput } from '@/entities/user/user-entity.js';
import { prisma } from '@/lib/prisma/index.js';
import { IUsersRepository } from './users-interface.js';

export class UsersRepository implements IUsersRepository {
  async findById(id: string): Promise<User | undefined> {
    const user = await prisma.user.findUnique({ where: { id } });
    return user ? UserSchema.parse(user) : undefined;
  }

  async create(data: UserCreateInput): Promise<User> {
    const user = await prisma.user.create({ data });
    return UserSchema.parse(user);
  }

  async findByEmail(data: { email: string }): Promise<User | undefined> {
    const user = await prisma.user.findUnique({ 
      where: 
      { email: data.email } 
    });
    return user ? UserSchema.parse(user) : undefined;
  }
}