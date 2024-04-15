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

// src/core/use-cases/check-in.use-case.ts
var check_in_use_case_exports = {};
__export(check_in_use_case_exports, {
  CheckInUseCase: () => CheckInUseCase
});
module.exports = __toCommonJS(check_in_use_case_exports);
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

// src/core/errors/conflict.error.ts
var ConflictError = class extends ClientError {
  constructor(message) {
    super(message ?? "Conflict", 409);
  }
};

// src/core/use-cases/check-in.use-case.ts
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
  (0, import_tsyringe.injectable)(),
  __decorateParam(0, (0, import_tsyringe.inject)("AttendeeRepository" /* Attendee */))
], CheckInUseCase);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CheckInUseCase
});
