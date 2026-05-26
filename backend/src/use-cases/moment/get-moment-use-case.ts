 import { prisma } from "@/lib/prisma/index.js";
import { type Moments } from "@/schemas/moment-schemas.js";
 
 interface GetMomentUseCaseRequest {
  userId: string;
}

interface GetMomentUseCaseResponse {
  moments: Moments[];
}

export class GetMomentUseCase {
  async execute(data: GetMomentUseCaseRequest): Promise<GetMomentUseCaseResponse> {
    const { userId } = data;

    const moments = await prisma.registeredMoment.findMany({
      where: {
        userId,
      },
      orderBy: {
        isFavorite: 'desc',
      }
    });

    const formattedMoments = moments.map(moment => ({
      id: moment.id,
      title: moment.title,
      story: moment.story ?? '',
      visitedLocation: moment.visitedLocation,
      imageUrl: moment.imageUrl,
      visitedDate: moment.visitedDate.toString(),
      isFavorite: moment.isFavorite,
    }));


    return { moments: formattedMoments };
  }
}