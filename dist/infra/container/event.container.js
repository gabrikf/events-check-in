"use strict";

// src/infra/container/event.container.ts
var import_tsyringe = require("tsyringe");

// src/infra/lib/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();

// src/core/dtos/event-detals.dto.ts
var EventDetailDto = class {
  id;
  title;
  details;
  slug;
  maximumAttendees;
  attendeesAmount;
  constructor(props) {
    this.id = props.id;
    this.title = props.title;
    this.details = props.details ?? null;
    this.slug = props.slug;
    this.maximumAttendees = props.maximumAttendees;
    this.attendeesAmount = props.attendeesAmount;
  }
};

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

// src/infra/container/event.container.ts
import_tsyringe.container.registerSingleton(
  "EventRepository" /* Event */,
  PrismaEventRepository
);
