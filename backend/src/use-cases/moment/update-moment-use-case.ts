import { type Moment } from "@/entities/moment/moment-entity.js";
import type { IMomentRepository } from "@/repositories/moments/moment-interface.js";

interface UpdateMomentRequest {
  title: string;
  story: string;
  visitedLocation?: string[];
  imageUrl: string;
  visitedDate: Date;
  userId: string;
}




export class UpdateMomentUseCase {
  constructor(private momentsRepository: IMomentRepository) {}

  async execute(id: string, data: UpdateMomentRequest): Promise<Moment> {
    const { title, story, imageUrl, visitedDate, visitedLocation, userId} = data;

    const moment = await this.momentsRepository.update(id, {
      title,
      story,
      imageUrl,
      visitedDate: visitedDate.toISOString(),
      visitedLocation,
      userId,
    });

    if (!moment) {
      throw new Error("Moment not found");
    }

    return moment;
  
  }
}
