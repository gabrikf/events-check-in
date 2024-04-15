import {
  ConflictError
} from "./chunk-KJ3BH632.mjs";
import {
  NotFoundError
} from "./chunk-FZVHOPOI.mjs";
import {
  __decorateClass,
  __decorateParam
} from "./chunk-WZGJBVCM.mjs";

// src/core/use-cases/check-in.use-case.ts
import { inject, injectable } from "tsyringe";
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
  injectable(),
  __decorateParam(0, inject("AttendeeRepository" /* Attendee */))
], CheckInUseCase);

export {
  CheckInUseCase
};
