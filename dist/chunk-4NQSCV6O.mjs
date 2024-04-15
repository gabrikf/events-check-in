import {
  AttendeeEntity
} from "./chunk-GZTCSPNV.mjs";
import {
  ForbiddenError
} from "./chunk-P2DG76YG.mjs";
import {
  __decorateClass,
  __decorateParam
} from "./chunk-WZGJBVCM.mjs";

// src/core/use-cases/register.use-case.ts
import { inject, injectable } from "tsyringe";
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
  injectable(),
  __decorateParam(0, inject("AttendeeRepository" /* Attendee */)),
  __decorateParam(1, inject("EventRepository" /* Event */))
], RegisterUseCase);

export {
  RegisterUseCase
};
