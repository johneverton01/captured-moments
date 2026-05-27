
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

    const formattedMoment = {
      ...moment,
      visitedDate: this.formatVisitedDate(moment.visitedDate),
    };

    return MomentSchema.parse(formattedMoment);
  }

  async findById(id: string): Promise<Moment | undefined> {
    const moment = await prisma.registeredMoment.findUnique({
      where: { id },
    });

    if (!moment) {
      return undefined;
    }

    const formattedMoment = {
      ...moment,
      visitedDate: this.formatVisitedDate(moment.visitedDate),
    };

    return MomentSchema.parse(formattedMoment);
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
      visitedDate: this.formatVisitedDate(moment.visitedDate),
    }));

    return MomentSchema.array().parse(formattedMoments);
  }

  async update(id: string, data: Partial<MomentCreateInput>): Promise<Moment | undefined> {
    const { title, story, imageUrl, visitedDate, visitedLocation, userId } = data;

    const existingMoment = await prisma.registeredMoment.findUnique({
      where: { userId, id },
    });

    if (!existingMoment) {
      throw new Error("Moment not found");
    }

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

    const formattedMoment = {
      ...moment,
      visitedDate: this.formatVisitedDate(moment.visitedDate),
    };

    return MomentSchema.parse(formattedMoment);
  }

  async delete(id: string, userId: string): Promise<void> {
    await prisma.registeredMoment.delete({
      where: { id, userId },
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
      visitedDate: this.formatVisitedDate(moment.visitedDate),
    }));

    return MomentSchema.array().parse(formattedMoments);
  }

  private formatVisitedDate(date: Date): string {
    return date.toISOString();
  }
}