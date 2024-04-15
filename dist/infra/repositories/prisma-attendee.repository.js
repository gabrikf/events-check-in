"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/infra/repositories/prisma-attendee.repository.ts
var prisma_attendee_repository_exports = {};
__export(prisma_attendee_repository_exports, {
  PrismaAttendeeRepository: () => PrismaAttendeeRepository
});
module.exports = __toCommonJS(prisma_attendee_repository_exports);

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PrismaAttendeeRepository
});
