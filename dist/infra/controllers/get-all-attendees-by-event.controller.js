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

// src/infra/controllers/get-all-attendees-by-event.controller.ts
var get_all_attendees_by_event_controller_exports = {};
__export(get_all_attendees_by_event_controller_exports, {
  GetAllAttendeesByEventController: () => GetAllAttendeesByEventController
});
module.exports = __toCommonJS(get_all_attendees_by_event_controller_exports);

// src/infra/schema/get-all-attendees-by-event.schema.ts
var import_zod = __toESM(require("zod"));
var getAllAttendeesByEventParamsInput = import_zod.default.object({
  eventId: import_zod.default.string().uuid()
});
var getAllAttendeesByEventQueryInput = import_zod.default.object({
  page: import_zod.default.coerce.number(),
  limit: import_zod.default.coerce.number(),
  query: import_zod.default.string().nullish()
});
var getAllAttendeesByEventOutput = import_zod.default.object({
  data: import_zod.default.array(
    import_zod.default.object({
      id: import_zod.default.number(),
      name: import_zod.default.string(),
      email: import_zod.default.string().email(),
      createdAt: import_zod.default.date(),
      eventId: import_zod.default.string().uuid()
    })
  ),
  count: import_zod.default.number()
});

// src/infra/controllers/get-all-attendees-by-event.controller.ts
var import_tsyringe2 = require("tsyringe");

// src/core/use-cases/get-all-attendees.use-case.ts
var import_tsyringe = require("tsyringe");

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
  (0, import_tsyringe.injectable)(),
  __decorateParam(0, (0, import_tsyringe.inject)("AttendeeRepository" /* Attendee */))
], GetAllAttendeesByEventUseCase);

// src/infra/controllers/get-all-attendees-by-event.controller.ts
var GetAllAttendeesByEventController = class {
  static async handle(app) {
    app.withTypeProvider().get(
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
        const getAllAttendeesByEventUseCase = import_tsyringe2.container.resolve(
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GetAllAttendeesByEventController
});
