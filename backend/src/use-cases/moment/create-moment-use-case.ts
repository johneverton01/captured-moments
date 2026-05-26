import { prisma } from "@/lib/prisma/index.js";

interface CreateMomentRequest {
  title: string;
  story: string;
  visitedLocation?: string[];
  imageUrl: string;
  visitedDate: Date;
  userId: string;
}

interface CreateMomentResponse {
    id: string;
    title: string;
    story: string;
    visitedLocation?: string[];
    imageUrl: string;
    visitedDate: Date;
    createdAt: Date;
    updatedAt: Date;
}


export class CreateMomentUseCase {
  async execute(data: CreateMomentRequest): Promise<CreateMomentResponse> {
    const { title, story, imageUrl, visitedDate, visitedLocation, userId } = data;

    const moment = await prisma.registeredMoment.create({
      data: {
        title,
        story,
        imageUrl,
        visitedDate: new Date(visitedDate),
        visitedLocation,
        userId,
      },
    });

    return  {
      id: moment.id,
      title: moment.title,
      story: moment.story ?? '',
      visitedLocation: moment.visitedLocation,
      imageUrl: moment.imageUrl,
      visitedDate: moment.visitedDate,
      createdAt: moment.createdAt,
      updatedAt: moment.updatedAt
    };
  }
}
