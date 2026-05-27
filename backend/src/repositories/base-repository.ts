export interface IBaseRepository<T, C, U = Partial<C>> {
  findById(id: string): Promise<T | undefined>;
  create(data: C): Promise<T>;
  findAll?(id?: string): Promise<T[]>;
  update?(id: string, data: U): Promise<T | undefined>;
  delete?(id: string): Promise<void>;
  search?(query: Partial<T>, page?: string): Promise<T[]>;
}