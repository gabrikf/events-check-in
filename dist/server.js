"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};
var __decorateParam = (index, decorator) => (target, key) => decorator(target, key, index);

// src/server.ts
var import_reflect_metadata = require("reflect-metadata");
var import_fastify = __toESM(require("fastify"));
var import_fastify_type_provider_zod = require("fastify-type-provider-zod");

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
var PaginationInputDto = class {
  take;
  skip;
  query;
  constructor(props) {
    this.take = props.limit;
    this.skip = (props.page - 1) * props.limit;
    this.query = props.query ?? null;
  }
};
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

// src/infra/schema/register.schema.ts
var import_zod = __toESM(require("zod"));
var registerBodyInputSchema = import_zod.default.object({
  name: import_zod.default.string().min(3),
  email: import_zod.default.string().email()
});
var registerParamsInputSchema = import_zod.default.object({
  eventId: import_zod.default.string().uuid()
});
var registerOutputSchema = import_zod.default.object({
  id: import_zod.default.number().int(),
  createdAt: import_zod.default.date(),
  email: import_zod.default.string().email(),
  eventId: import_zod.default.string().uuid(),
  name: import_zod.default.string().min(3)
});

// src/infra/controllers/register.controller.ts
var import_tsyringe4 = require("tsyringe");

// src/core/use-cases/register.use-case.ts
var import_tsyringe3 = require("tsyringe");

// src/core/errors/index.ts
var ClientError = class extends Error {
  statusCode = 400;
  constructor(message, status) {
    super(message);
    if (status >= 400 && status < 500) {
      this.statusCode = status;
    }
  }
};

// src/core/errors/forbidden.error.ts
var ForbiddenError = class extends ClientError {
  constructor(message) {
    super(message ?? "Forbidden resource", 403);
  }
};

// src/core/use-cases/register.use-case.ts
var RegisterUseCase = class {
  constructor(attendeeRepository, eventRepository) {
    this.attendeeRepository = attendeeRepository;
    this.eventRepository = eventRepository;
  }
  async execute(data) {
    const entity = AttendeeEntity.create(data);
    const alreadyRegistered = await this.attendeeRepository.findByEmailAndEvent(
      {
        email: entity.email,
        eventId: entity.eventId
      }
    );
    if (alreadyRegistered) {
      throw new ForbiddenError(
        "This email is already registered for this event"
      );
    }
    const [event, amountOfAttendeesInEvent] = await Promise.all([
      this.eventRepository.findById(entity.eventId),
      this.attendeeRepository.countAttendeesByEventId(entity.eventId)
    ]);
    if (event?.maximumAttendees && amountOfAttendeesInEvent >= event.maximumAttendees) {
      throw new ForbiddenError(
        "The maximum number of attendees for this event has been reached."
      );
    }
    const createdAttendee = await this.attendeeRepository.insert(entity);
    return createdAttendee;
  }
};
RegisterUseCase = __decorateClass([
  (0, import_tsyringe3.injectable)(),
  __decorateParam(0, (0, import_tsyringe3.inject)("AttendeeRepository" /* Attendee */)),
  __decorateParam(1, (0, import_tsyringe3.inject)("EventRepository" /* Event */))
], RegisterUseCase);

// src/infra/controllers/register.controller.ts
var RegisterController = class {
  static async handle(app2) {
    app2.withTypeProvider().post(
      "/events/:eventId/attendee",
      {
        schema: {
          tags: ["Events"],
          body: registerBodyInputSchema,
          params: registerParamsInputSchema,
          response: {
            201: registerOutputSchema
          }
        }
      },
      async (request, reply) => {
        const registerUseCase = import_tsyringe4.container.resolve(RegisterUseCase);
        const { name, email } = request.body;
        const { eventId } = request.params;
        const createdAttendee = await registerUseCase.execute({
          name,
          email,
          eventId
        });
        return reply.status(201).send(createdAttendee);
      }
    );
  }
};

// src/infra/controllers/create-event.controller.ts
var import_tsyringe6 = require("tsyringe");

// src/core/use-cases/create-event.use-case.ts
var import_tsyringe5 = require("tsyringe");

// src/core/entities/event.entity.ts
var import_crypto = require("crypto");

// src/utils/generate-slug.ts
function generateSlug(title) {
  const slug = title.toLowerCase().replace(/\s+/g, "-");
  return slug;
}

// src/core/entities/event.entity.ts
var EventEntity = class _EventEntity {
  id;
  title;
  details;
  slug;
  maximumAttendees;
  constructor(props) {
    this.id = props.id;
    this.title = props.title;
    this.details = props.details ?? null;
    this.slug = props.slug;
    this.maximumAttendees = props.maximumAttendees ?? null;
  }
  static create({ title, details, maximumAttendees }) {
    const id = (0, import_crypto.randomUUID)();
    const slug = generateSlug(title);
    const event = new _EventEntity({
      id,
      title,
      details,
      slug,
      maximumAttendees
    });
    return event;
  }
};

// src/core/errors/conflict.error.ts
var ConflictError = class extends ClientError {
  constructor(message) {
    super(message ?? "Conflict", 409);
  }
};

// src/core/use-cases/create-event.use-case.ts
var CreateEventUseCase = class {
  constructor(eventRepository) {
    this.eventRepository = eventRepository;
  }
  async execute(args) {
    const event = EventEntity.create(args);
    const slugAlreadyUsed = await this.eventRepository.findBySlug(event.slug);
    if (slugAlreadyUsed) {
      throw new ConflictError("This slug is already being used");
    }
    const createdEvent = await this.eventRepository.insert(event);
    return createdEvent;
  }
};
CreateEventUseCase = __decorateClass([
  (0, import_tsyringe5.injectable)(),
  __decorateParam(0, (0, import_tsyringe5.inject)("EventRepository" /* Event */))
], CreateEventUseCase);

// src/infra/schema/create-event.schema.ts
var import_zod2 = require("zod");
var createEventInputSchema = import_zod2.z.object({
  title: import_zod2.z.string().min(4),
  details: import_zod2.z.string().nullable(),
  maximumAttendees: import_zod2.z.number().int().positive().nullable()
});
var createEventOutputSchema = import_zod2.z.object({
  id: import_zod2.z.string().uuid(),
  title: import_zod2.z.string().min(4),
  details: import_zod2.z.string().nullable(),
  slug: import_zod2.z.string(),
  maximumAttendees: import_zod2.z.number().int().positive().nullable()
});

// src/infra/controllers/create-event.controller.ts
var CreateEventController = class {
  static async handle(app2) {
    app2.withTypeProvider().post(
      "/events",
      {
        schema: {
          tags: ["Events"],
          body: createEventInputSchema,
          response: {
            201: createEventOutputSchema
          }
        }
      },
      async (request, reply) => {
        const createEventUseCase = import_tsyringe6.container.resolve(CreateEventUseCase);
        const event = await createEventUseCase.execute(request.body);
        return reply.status(201).send(event);
      }
    );
  }
};

// src/infra/schema/event-details.schema.ts
var import_zod3 = __toESM(require("zod"));
var eventDetailsParamsInputSchema = import_zod3.default.object({
  id: import_zod3.default.string().uuid()
});
var eventDetailsOutputSchema = import_zod3.default.object({
  id: import_zod3.default.string().uuid(),
  title: import_zod3.default.string(),
  details: import_zod3.default.string().nullable(),
  slug: import_zod3.default.string(),
  maximumAttendees: import_zod3.default.number().int().positive().nullable(),
  attendeesAmount: import_zod3.default.number().int().positive()
});

// src/infra/controllers/event-details.controller.ts
var import_tsyringe8 = require("tsyringe");

// src/core/use-cases/event-details.use-case.ts
var import_tsyringe7 = require("tsyringe");

// src/core/errors/not-found.error.ts
var NotFoundError = class extends ClientError {
  constructor(message) {
    super(message ?? "Not found", 404);
  }
};

// src/core/use-cases/event-details.use-case.ts
var EventDetailsUseCase = class {
  constructor(eventRepository) {
    this.eventRepository = eventRepository;
  }
  async execute(id) {
    const event = await this.eventRepository.findById(id);
    if (!event) {
      throw new NotFoundError("Event not found");
    }
    return event;
  }
};
EventDetailsUseCase = __decorateClass([
  (0, import_tsyringe7.injectable)(),
  __decorateParam(0, (0, import_tsyringe7.inject)("EventRepository" /* Event */))
], EventDetailsUseCase);

// src/infra/controllers/event-details.controller.ts
var EventDetailsController = class {
  static async handle(app2) {
    app2.withTypeProvider().get(
      "/events/:id",
      {
        schema: {
          tags: ["Events"],
          params: eventDetailsParamsInputSchema,
          response: {
            200: eventDetailsOutputSchema
          }
        }
      },
      async (request, reply) => {
        const eventDetailsUseCase = import_tsyringe8.container.resolve(EventDetailsUseCase);
        const { id } = request.params;
        const event = await eventDetailsUseCase.execute(id);
        return reply.send(event);
      }
    );
  }
};

// src/infra/schema/get-attendee-badge.schema.ts
var import_zod4 = __toESM(require("zod"));
var getAttendeeBadgeParamsSchema = import_zod4.default.object({
  id: import_zod4.default.string().transform(Number)
});
var getAttendeeBadgeOutputSchema = import_zod4.default.object({
  name: import_zod4.default.string(),
  email: import_zod4.default.string().email(),
  eventTitle: import_zod4.default.string(),
  checkInUrl: import_zod4.default.string().url()
});

// src/infra/controllers/get-attendee-badge.controller.ts
var import_tsyringe10 = require("tsyringe");

// src/core/use-cases/get-attendee-badge.use-case.ts
var import_tsyringe9 = require("tsyringe");

// src/core/dtos/get-attendee-badge-with-url.dto.ts
var GetAttendeeBadgeWithUrl = class extends GetAttendeeBadgeDto {
  checkInUrl;
  constructor({
    name,
    email,
    eventTitle,
    checkInUrl
  }) {
    super({
      email,
      eventTitle,
      name
    });
    this.checkInUrl = checkInUrl;
  }
};

// src/core/use-cases/get-attendee-badge.use-case.ts
var GetAttendeeBadgeUseCase = class {
  constructor(attendeeRepository) {
    this.attendeeRepository = attendeeRepository;
  }
  async execute(props) {
    const attendeeBadge = await this.attendeeRepository.findAttendeeBadgeById(
      props.id
    );
    if (!attendeeBadge) {
      throw new NotFoundError("Attendee not found.");
    }
    const baseUrl = `${props.protocol}://${props.hostname}`;
    const checkInPath = `/attendee/${props.id}/check-in`;
    const checkInUrl = new URL(checkInPath, baseUrl);
    return new GetAttendeeBadgeWithUrl({
      ...attendeeBadge,
      checkInUrl: checkInUrl.toString()
    });
  }
};
GetAttendeeBadgeUseCase = __decorateClass([
  (0, import_tsyringe9.injectable)(),
  __decorateParam(0, (0, import_tsyringe9.inject)("AttendeeRepository" /* Attendee */))
], GetAttendeeBadgeUseCase);

// src/infra/controllers/get-attendee-badge.controller.ts
var GetAttendeeBadgeController = class {
  static async handle(app2) {
    app2.withTypeProvider().get(
      "/attendees/:id/badge",
      {
        schema: {
          tags: ["Attendees"],
          params: getAttendeeBadgeParamsSchema,
          response: {
            200: getAttendeeBadgeOutputSchema
          }
        }
      },
      async (request, reply) => {
        const getAttendeeBadge = import_tsyringe10.container.resolve(GetAttendeeBadgeUseCase);
        const attendeeBadge = await getAttendeeBadge.execute({
          id: request.params.id,
          protocol: request.protocol,
          hostname: request.hostname
        });
        return reply.send(attendeeBadge);
      }
    );
  }
};

// src/infra/controllers/check-in.controller.ts
var import_tsyringe12 = require("tsyringe");

// src/core/use-cases/check-in.use-case.ts
var import_tsyringe11 = require("tsyringe");
var CheckInUseCase = class {
  constructor(attendeeRepository) {
    this.attendeeRepository = attendeeRepository;
  }
  async execute(id) {
    const attendee = await this.attendeeRepository.findById(id);
    if (!attendee) {
      throw new NotFoundError("Attendee not found.");
    }
    if (attendee?.checkedInAt) {
      throw new ConflictError("Attendee already checked-in for this event.");
    }
    attendee.checkIn();
    const updated = await this.attendeeRepository.update({
      id,
      data: attendee
    });
    return updated;
  }
};
CheckInUseCase = __decorateClass([
  (0, import_tsyringe11.injectable)(),
  __decorateParam(0, (0, import_tsyringe11.inject)("AttendeeRepository" /* Attendee */))
], CheckInUseCase);

// src/infra/schema/check-in.schema.ts
var import_zod5 = __toESM(require("zod"));
var checkInParamsSchema = import_zod5.default.object({
  id: import_zod5.default.coerce.number()
});
var checkInOutputSchema = import_zod5.default.null();

// src/infra/controllers/check-in.controller.ts
var CreateCheckInController = class {
  static async handle(app2) {
    app2.withTypeProvider().get(
      "/attendees/:id/check-in",
      {
        schema: {
          tags: ["Attendees"],
          params: checkInParamsSchema,
          response: {
            201: checkInOutputSchema
          }
        }
      },
      async (request, reply) => {
        const checkInUseCase = import_tsyringe12.container.resolve(CheckInUseCase);
        await checkInUseCase.execute(request.params.id);
        return reply.status(201).send();
      }
    );
  }
};

// src/infra/schema/get-all-attendees-by-event.schema.ts
var import_zod6 = __toESM(require("zod"));
var getAllAttendeesByEventParamsInput = import_zod6.default.object({
  eventId: import_zod6.default.string().uuid()
});
var getAllAttendeesByEventQueryInput = import_zod6.default.object({
  page: import_zod6.default.coerce.number(),
  limit: import_zod6.default.coerce.number(),
  query: import_zod6.default.string().nullish()
});
var getAllAttendeesByEventOutput = import_zod6.default.object({
  data: import_zod6.default.array(
    import_zod6.default.object({
      id: import_zod6.default.number(),
      name: import_zod6.default.string(),
      email: import_zod6.default.string().email(),
      createdAt: import_zod6.default.date(),
      eventId: import_zod6.default.string().uuid()
    })
  ),
  count: import_zod6.default.number()
});

// src/infra/controllers/get-all-attendees-by-event.controller.ts
var import_tsyringe14 = require("tsyringe");

// src/core/use-cases/get-all-attendees.use-case.ts
var import_tsyringe13 = require("tsyringe");

// src/core/dtos/get-all-attendees-paginated.dto.ts
var GetAllAttendeesPaginated = class extends PaginationInputDto {
  eventId;
  constructor({ eventId, ...rest }) {
    super(rest);
    this.eventId = eventId;
  }
};

// src/core/use-cases/get-all-attendees.use-case.ts
var GetAllAttendeesByEventUseCase = class {
  constructor(attendeeRepository) {
    this.attendeeRepository = attendeeRepository;
  }
  async execute(props) {
    const result = await this.attendeeRepository.findAllPaginated(
      new GetAllAttendeesPaginated({
        eventId: props.eventId,
        page: props.page,
        limit: props.limit,
        query: props.searchText
      })
    );
    return result;
  }
};
GetAllAttendeesByEventUseCase = __decorateClass([
  (0, import_tsyringe13.injectable)(),
  __decorateParam(0, (0, import_tsyringe13.inject)("AttendeeRepository" /* Attendee */))
], GetAllAttendeesByEventUseCase);

// src/infra/controllers/get-all-attendees-by-event.controller.ts
var GetAllAttendeesByEventController = class {
  static async handle(app2) {
    app2.withTypeProvider().get(
      "/attendees/:eventId/event",
      {
        schema: {
          tags: ["Attendees"],
          params: getAllAttendeesByEventParamsInput,
          querystring: getAllAttendeesByEventQueryInput,
          response: {
            200: getAllAttendeesByEventOutput
          }
        }
      },
      async (request, reply) => {
        const getAllAttendeesByEventUseCase = import_tsyringe14.container.resolve(
          GetAllAttendeesByEventUseCase
        );
        const result = await getAllAttendeesByEventUseCase.execute({
          eventId: request.params.eventId,
          page: request.query.page,
          limit: request.query.limit,
          searchText: request.query.query
        });
        return reply.send(result);
      }
    );
  }
};

// src/server.ts
var import_swagger = __toESM(require("@fastify/swagger"));
var import_swagger_ui = __toESM(require("@fastify/swagger-ui"));

// src/error-handler.ts
var import_zod7 = require("zod");
var errorHandler = (error, request, reply) => {
  if (error instanceof import_zod7.ZodError) {
    return reply.status(400).send({
      message: "Error during validation",
      errors: error.flatten().fieldErrors
    });
  }
  if (error instanceof ClientError) {
    return reply.status(error.statusCode).send({
      message: error.message
    });
  }
  return reply.status(500).send({ message: "Internal server error!" });
};

// src/server.ts
var app = (0, import_fastify.default)();
app.register(import_swagger.default, {
  swagger: {
    consumes: ["application/json"],
    produces: ["application/json"],
    info: {
      title: "pass-in",
      version: "1.0.0",
      description: "This is the api documentation for pass-in, an check-in method for events"
    }
  },
  transform: import_fastify_type_provider_zod.jsonSchemaTransform
});
app.register(import_swagger_ui.default, {
  routePrefix: "/docs"
});
app.setValidatorCompiler(import_fastify_type_provider_zod.validatorCompiler);
app.setSerializerCompiler(import_fastify_type_provider_zod.serializerCompiler);
app.register(CreateEventController.handle);
app.register(RegisterController.handle);
app.register(EventDetailsController.handle);
app.register(GetAttendeeBadgeController.handle);
app.register(CreateCheckInController.handle);
app.register(GetAllAttendeesByEventController.handle);
app.setErrorHandler(errorHandler);
app.listen({ port: 3333, host: "0.0.0.0" }).then(() => {
  console.log("server running on port 3333");
});
