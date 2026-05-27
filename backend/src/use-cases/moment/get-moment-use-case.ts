 import type { Moment } from "@/entities/moment/moment-entity.js";
import type { IMomentRepository } from "@/repositories/moments/moment-interface.js";
 
 interface GetMomentUseCaseRequest {
  userId: string;
}

export class GetMomentUseCase {
  constructor(private momentsRepository: IMomentRepository) {}

  async execute(data: GetMomentUseCaseRequest): Promise<Moment[]> {
    const { userId } = data;

    const moments = await this.momentsRepository.findAll(userId);
    
    return moments
  }
}