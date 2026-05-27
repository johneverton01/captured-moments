import type { Moment } from "@/entities/moment/moment-entity.js";
import type { IMomentRepository } from "@/repositories/moments/moment-interface.js";

interface CreateMomentRequest {
  title: string;
  story: string;
  visitedLocation?: string[];
  imageUrl: string;
  visitedDate: Date;
  userId: string;
}




export class CreateMomentUseCase {
  constructor(private momentsRepository: IMomentRepository) {}

  async execute(data: CreateMomentRequest): Promise<Moment> {
    const { title, story, imageUrl, visitedDate, visitedLocation, userId } = data;

    const moment = await this.momentsRepository.create({
      title,
      story,
      imageUrl,
      visitedDate: visitedDate.toISOString(),
        visitedLocation,
        userId,
    });

    return moment;
  }
}
