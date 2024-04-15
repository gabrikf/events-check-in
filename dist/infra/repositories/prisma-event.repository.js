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

// src/infra/repositories/prisma-event.repository.ts
var prisma_event_repository_exports = {};
__export(prisma_event_repository_exports, {
  PrismaEventRepository: () => PrismaEventRepository
});
module.exports = __toCommonJS(prisma_event_repository_exports);

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PrismaEventRepository
});
