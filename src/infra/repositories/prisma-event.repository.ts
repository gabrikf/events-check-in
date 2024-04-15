import { Event, Prisma, PrismaClient } from "@prisma/client";
import { IEventRepository } from "../../core/repositories/event.repository";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { EventEntity } from "../../core/entities/event/event.entity";
import { prisma } from "../lib/prisma";
import { EventDetailDto } from "../../core/dtos/event-detals.dto";

export class PrismaEventRepository implements IEventRepository {
  private repository: Prisma.EventDelegate<DefaultArgs>;
  constructor() {
    this.repository = prisma.event;
  }
  async findDetailsById(id: string): Promise<EventDetailDto | null> {
    const event = await this.repository.findUnique({
      select: {
        id: true,
        title: true,
        details: true,
        slug: true,
        maximumAttendees: true,
        _count: {
          select: {
            attendees: true,
          },
        },
      },
      where: {
        id,
      },
    });
    if (!event) {
      return null;
    }
    const parsed = new EventDetailDto({
      id: event?.id,
      details: event?.details,
      slug: event.slug,
      title: event.title,
      maximumAttendees: event.maximumAttendees,
      attendeesAmount: event._count.attendees,
    });
    return parsed;
  }
  async findBySlug(slug: string): Promise<EventEntity | null> {
    return this.repository.findUnique({
      where: {
        slug,
      },
    });
  }
  async insert(data: Prisma.EventCreateInput): Promise<Event> {
    return this.repository.create({
      data,
    });
  }
}
