
import { MomentSchema, type Moment, type MomentCreateInput } from '@/entities/moment/moment-entity.js';
import { prisma } from '@/lib/prisma/index.js';
import { IMomentRepository } from './moment-interface.js';
export class MomentRepository implements IMomentRepository {
  async create(data: MomentCreateInput): Promise<Moment> {
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

    return MomentSchema.parse(moment);
  }

  async findById(id: string): Promise<Moment | undefined> {
    const moment = await prisma.registeredMoment.findUnique({
      where: { id },
    });

    return moment ? MomentSchema.parse(moment) : undefined;
  }

  async findAll(userId: string): Promise<Moment[]> {
    const moments = await prisma.registeredMoment.findMany({
      where: {
        userId,
      },
      orderBy: {
        isFavorite: 'desc',
      }
    });

    const formattedMoments = moments.map(moment => ({
      ...moment,
      visitedDate: moment.visitedDate.toISOString(),
    }));

    return MomentSchema.array().parse(formattedMoments);
  }

  async update(id: string, data: Partial<MomentCreateInput>): Promise<Moment | undefined> {
    const { title, story, imageUrl, visitedDate, visitedLocation } = data;
    const moment = await prisma.registeredMoment.update({
      where: { id },
      data: {
        title,
        story,
        imageUrl,
        visitedDate: visitedDate ? new Date(visitedDate) : undefined,
        visitedLocation,
      },
    });

    return moment ? MomentSchema.parse(moment) : undefined;
  }

  async delete(id: string): Promise<void> {
    await prisma.registeredMoment.delete({
      where: { id },
    });
  }

  async search(query: Partial<Moment>, page?: string, userId?: string): Promise<Moment[]> {
    const pageSize = 10;
    const pageNumber = page ? parseInt(page, 10) : 1;
    const moments = await prisma.registeredMoment.findMany({
      where: {
        userId,
        OR: [
          { title: { contains: query.title, mode: 'insensitive' } },
          { story: { contains: query.story, mode: 'insensitive' } },
          { visitedLocation: { hasSome: query.visitedLocation } },
        ],
      },
      orderBy: {
        isFavorite: 'desc',
      },
      skip: (pageNumber - 1) * pageSize,
      take: pageSize,
    })

    const formattedMoments = moments.map(moment => ({
      ...moment,
      visitedDate: moment.visitedDate.toISOString(),
    }));

    return MomentSchema.array().parse(formattedMoments);
  }
}