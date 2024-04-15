import {
  prisma
} from "./chunk-XW43K6FP.mjs";
import {
  EventDetailDto
} from "./chunk-PKF4URSN.mjs";

// src/infra/repositories/prisma-event.repository.ts
var PrismaEventRepository = class {
  repository;
  constructor() {
    this.repository = prisma.event;
  }
  async findById(id) {
    const event = await this.repository.findUnique({
      select: {
        id: true,
        title: true,
        details: true,
        slug: true,
        maximumAttendees: true,
        _count: {
          select: {
            attendees: true
          }
        }
      },
      where: {
        id
      }
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
      attendeesAmount: event._count.attendees
    });
    return parsed;
  }
  async findBySlug(slug) {
    return this.repository.findUnique({
      where: {
        slug
      }
    });
  }
  async insert(data) {
    return this.repository.create({
      data
    });
  }
};

export {
  PrismaEventRepository
};
