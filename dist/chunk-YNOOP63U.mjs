import {
  PaginationOutputDto
} from "./chunk-HQS6OF3G.mjs";
import {
  GetAttendeeBadgeDto
} from "./chunk-VVS4RKOE.mjs";
import {
  AttendeeEntity
} from "./chunk-GZTCSPNV.mjs";
import {
  prisma
} from "./chunk-XW43K6FP.mjs";

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

export {
  PrismaAttendeeRepository
};
