"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
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

// src/infra/controllers/event-details.controller.ts
var event_details_controller_exports = {};
__export(event_details_controller_exports, {
  EventDetailsController: () => EventDetailsController
});
module.exports = __toCommonJS(event_details_controller_exports);

// src/infra/schema/event-details.schema.ts
var import_zod = __toESM(require("zod"));
var eventDetailsParamsInputSchema = import_zod.default.object({
  id: import_zod.default.string().uuid()
});
var eventDetailsOutputSchema = import_zod.default.object({
  id: import_zod.default.string().uuid(),
  title: import_zod.default.string(),
  details: import_zod.default.string().nullable(),
  slug: import_zod.default.string(),
  maximumAttendees: import_zod.default.number().int().positive().nullable(),
  attendeesAmount: import_zod.default.number().int().positive()
});

// src/infra/controllers/event-details.controller.ts
var import_tsyringe2 = require("tsyringe");

// src/core/use-cases/event-details.use-case.ts
var import_tsyringe = require("tsyringe");

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
  (0, import_tsyringe.injectable)(),
  __decorateParam(0, (0, import_tsyringe.inject)("EventRepository" /* Event */))
], EventDetailsUseCase);

// src/infra/controllers/event-details.controller.ts
var EventDetailsController = class {
  static async handle(app) {
    app.withTypeProvider().get(
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
        const eventDetailsUseCase = import_tsyringe2.container.resolve(EventDetailsUseCase);
        const { id } = request.params;
        const event = await eventDetailsUseCase.execute(id);
        return reply.send(event);
      }
    );
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  EventDetailsController
});
