import {
  NotFoundError
} from "./chunk-FZVHOPOI.mjs";
import {
  GetAttendeeBadgeWithUrl
} from "./chunk-UNPCKMWJ.mjs";
import {
  __decorateClass,
  __decorateParam
} from "./chunk-WZGJBVCM.mjs";

// src/core/use-cases/get-attendee-badge.use-case.ts
import { inject, injectable } from "tsyringe";
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
  injectable(),
  __decorateParam(0, inject("AttendeeRepository" /* Attendee */))
], GetAttendeeBadgeUseCase);

export {
  GetAttendeeBadgeUseCase
};
