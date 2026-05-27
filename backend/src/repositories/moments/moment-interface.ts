import type { Moment, MomentCreateInput, MomentUpdateInput } from '@/entities/moment/moment-entity.js';
import { IBaseRepository } from '../base-repository.js';

export interface IMomentRepository extends IBaseRepository<
Moment,
MomentCreateInput,
MomentUpdateInput> {
  create(data: MomentCreateInput): Promise<Moment>;
  findById(id: string): Promise<Moment | undefined>;
  findAll(userId: string): Promise<Moment[]>;
  update(id: string, data: MomentUpdateInput): Promise<Moment | undefined>;
  delete(id: string): Promise<void>;
  // search(query: Partial<Moment>, page?: number): Promise<Moment[]>;
}