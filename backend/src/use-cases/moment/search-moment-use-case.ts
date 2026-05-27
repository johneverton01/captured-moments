 import type { Moment } from "@/entities/moment/moment-entity.js";
import { UnauthorizedError } from "@/http/routes/__errors/unauthorized-error.js";
import type { IMomentRepository } from "@/repositories/moments/moment-interface.js";
 
 interface SearchMomentUseCaseRequest {
  userId: string;
  searchTerm?: string;
  page?: string;
}

export class SearchMomentUseCase {
  constructor(private momentsRepository: IMomentRepository) {}

  async execute(data: SearchMomentUseCaseRequest): Promise<Moment[]> {
    const { userId, searchTerm, page } = data;

    if (!userId) {
      throw new UnauthorizedError();
    }

    if (searchTerm && searchTerm.trim() === "") {
      return [];
    }

    const moments = await this.momentsRepository.search(
      { 
        title: searchTerm, 
        story: searchTerm, 
        visitedLocation: searchTerm ? [searchTerm] : undefined 
      },
      page,
      userId
    );
    
    return moments
  }
}