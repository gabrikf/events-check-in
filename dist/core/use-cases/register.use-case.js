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

// src/core/use-cases/register.use-case.ts
var register_use_case_exports = {};
__export(register_use_case_exports, {
  RegisterUseCase: () => RegisterUseCase
});
module.exports = __toCommonJS(register_use_case_exports);
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
  (0, import_tsyringe.injectable)(),
  __decorateParam(0, (0, import_tsyringe.inject)("AttendeeRepository" /* Attendee */)),
  __decorateParam(1, (0, import_tsyringe.inject)("EventRepository" /* Event */))
], RegisterUseCase);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  RegisterUseCase
});
