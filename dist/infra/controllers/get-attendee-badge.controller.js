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

// src/infra/controllers/get-attendee-badge.controller.ts
var get_attendee_badge_controller_exports = {};
__export(get_attendee_badge_controller_exports, {
  GetAttendeeBadgeController: () => GetAttendeeBadgeController
});
module.exports = __toCommonJS(get_attendee_badge_controller_exports);

// src/infra/schema/get-attendee-badge.schema.ts
var import_zod = __toESM(require("zod"));
var getAttendeeBadgeParamsSchema = import_zod.default.object({
  id: import_zod.default.string().transform(Number)
});
var getAttendeeBadgeOutputSchema = import_zod.default.object({
  name: import_zod.default.string(),
  email: import_zod.default.string().email(),
  eventTitle: import_zod.default.string(),
  checkInUrl: import_zod.default.string().url()
});

// src/infra/controllers/get-attendee-badge.controller.ts
var import_tsyringe2 = require("tsyringe");

// src/core/use-cases/get-attendee-badge.use-case.ts
var import_tsyringe = require("tsyringe");

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
  (0, import_tsyringe.injectable)(),
  __decorateParam(0, (0, import_tsyringe.inject)("AttendeeRepository" /* Attendee */))
], GetAttendeeBadgeUseCase);

// src/infra/controllers/get-attendee-badge.controller.ts
var GetAttendeeBadgeController = class {
  static async handle(app) {
    app.withTypeProvider().get(
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
        const getAttendeeBadge = import_tsyringe2.container.resolve(GetAttendeeBadgeUseCase);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GetAttendeeBadgeController
});
