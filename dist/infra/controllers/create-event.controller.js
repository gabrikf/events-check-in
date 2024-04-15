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

// src/infra/controllers/create-event.controller.ts
var create_event_controller_exports = {};
__export(create_event_controller_exports, {
  CreateEventController: () => CreateEventController
});
module.exports = __toCommonJS(create_event_controller_exports);
var import_tsyringe2 = require("tsyringe");

// src/core/use-cases/create-event.use-case.ts
var import_tsyringe = require("tsyringe");

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
  (0, import_tsyringe.injectable)(),
  __decorateParam(0, (0, import_tsyringe.inject)("EventRepository" /* Event */))
], CreateEventUseCase);

// src/infra/schema/create-event.schema.ts
var import_zod = require("zod");
var createEventInputSchema = import_zod.z.object({
  title: import_zod.z.string().min(4),
  details: import_zod.z.string().nullable(),
  maximumAttendees: import_zod.z.number().int().positive().nullable()
});
var createEventOutputSchema = import_zod.z.object({
  id: import_zod.z.string().uuid(),
  title: import_zod.z.string().min(4),
  details: import_zod.z.string().nullable(),
  slug: import_zod.z.string(),
  maximumAttendees: import_zod.z.number().int().positive().nullable()
});

// src/infra/controllers/create-event.controller.ts
var CreateEventController = class {
  static async handle(app) {
    app.withTypeProvider().post(
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
        const createEventUseCase = import_tsyringe2.container.resolve(CreateEventUseCase);
        const event = await createEventUseCase.execute(request.body);
        return reply.status(201).send(event);
      }
    );
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CreateEventController
});
