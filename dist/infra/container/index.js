"use strict";

// src/infra/container/attendee.container.ts
var import_tsyringe = require("tsyringe");

// src/core/entities/attendee.entity.ts
var AttendeeEntity = class _AttendeeEntity {
  id;
  name;
  email;
  createdAt;
  eventId;
  checkedInAt;
  static lastId = 0;
  constructor(props) {
    this.id = props.id;
    this.name = props.name;
    this.email = props.email;
    this.createdAt = props.createdAt;
    this.eventId = props.eventId;
    this.checkedInAt = props.checkedInAt ?? null;
  }
  static create({ email, eventId, name }) {
    const id = ++_AttendeeEntity.lastId;
    const createdAt = /* @__PURE__ */ new Date();
    const attendee = new _AttendeeEntity({
      id,
      name,
      email,
      createdAt,
      eventId
    });
    return attendee;
  }
  checkIn() {
    this.checkedInAt = /* @__PURE__ */ new Date();
    return this;
  }
};

// src/infra/lib/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();

// src/core/dtos/get-attendee-badge.dto.ts
var GetAttendeeBadgeDto = class {
  name;
  email;
  eventTitle;
  checkedInAt;
  constructor(props) {
    this.name = props.name;
    this.email = props.email;
    this.eventTitle = props.eventTitle;
    this.checkedInAt = props.checkedInAt ?? null;
  }
};

// src/core/dtos/shared/pagination.dto.ts
var PaginationOutputDto = class {
  data;
  count;
  constructor(props) {
    this.data = props.data;
    this.count = props.count;
  }
};

// src/infra/repositories/prisma-attendee.repository.ts
var PrismaAttendeeRepository = class {
  repository;
  constructor() {
    this.repository = prisma.attendee;
  }
  async findAllPaginated(props) {
    const [data, count] = await Promise.all([
      this.repository.findMany({
        take: props.take,
        skip: props.skip,
        where: props.query ? {
          eventId: props.eventId,
          OR: [
            {
              name: {
                contains: props.query
              }
            },
            {
              email: {
                contains: props.query
              }
            }
          ]
        } : {
          eventId: props.eventId
        }
      }),
      this.repository.count({
        where: props.query ? {
          eventId: props.eventId,
          OR: [
            {
              name: {
                contains: props.query
              }
            },
            {
              email: {
                contains: props.query
              }
            }
          ]
        } : {
          eventId: props.eventId
        }
      })
    ]);
    const result = new PaginationOutputDto({
      data: data.map(
        (attendee) => new AttendeeEntity({
          id: attendee.id,
          name: attendee.name,
          email: attendee.email,
          eventId: attendee.eventId,
          createdAt: attendee.createdAt,
          checkedInAt: attendee.checkedInAt
        })
      ),
      count
    });
    return result;
  }
  async findById(id) {
    const attendee = await this.repository.findUnique({
      where: {
        id
      }
    });
    if (!attendee) {
      return null;
    }
    return new AttendeeEntity(attendee);
  }
  async update({ id, data }) {
    const updatedAttendee = await this.repository.update({
      where: {
        id
      },
      data
    });
    return new AttendeeEntity(updatedAttendee);
  }
  async findAttendeeBadgeById(id) {
    const attendee = await this.repository.findUnique({
      select: {
        email: true,
        name: true,
        event: {
          select: {
            title: true
          }
        }
      },
      where: {
        id
      }
    });
    if (!attendee) {
      return null;
    }
    const parsed = new GetAttendeeBadgeDto({
      name: attendee?.name,
      email: attendee.email,
      eventTitle: attendee.event.title
    });
    return parsed;
  }
  async countAttendeesByEventId(eventId) {
    return this.repository.count({
      where: {
        eventId
      }
    });
  }
  async findByEmailAndEvent({
    email,
    eventId
  }) {
    const attendee = await this.repository.findUnique({
      where: {
        email_eventId: {
          email,
          eventId
        }
      }
    });
    if (!attendee) {
      return null;
    }
    return new AttendeeEntity({
      id: attendee.id,
      createdAt: attendee.createdAt,
      email: attendee.email,
      eventId: attendee.eventId,
      name: attendee.name,
      checkedInAt: attendee.checkedInAt
    });
  }
  async insert(data) {
    const createdAttendee = await this.repository.create({
      data
    });
    return new AttendeeEntity({
      id: createdAttendee.id,
      createdAt: createdAttendee.createdAt,
      email: createdAttendee.email,
      eventId: createdAttendee.eventId,
      name: createdAttendee.name,
      checkedInAt: createdAttendee.checkedInAt
    });
  }
};

// src/infra/container/attendee.container.ts
import_tsyringe.container.registerSingleton(
  "AttendeeRepository" /* Attendee */,
  PrismaAttendeeRepository
);

// src/infra/container/event.container.ts
var import_tsyringe2 = require("tsyringe");

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
import_tsyringe2.container.registerSingleton(
  "EventRepository" /* Event */,
  PrismaEventRepository
);
