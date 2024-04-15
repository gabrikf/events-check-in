import {
  NotFoundError
} from "./chunk-FZVHOPOI.mjs";
import {
  __decorateClass,
  __decorateParam
} from "./chunk-WZGJBVCM.mjs";

// src/core/use-cases/event-details.use-case.ts
import { inject, injectable } from "tsyringe";
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
  injectable(),
  __decorateParam(0, inject("EventRepository" /* Event */))
], EventDetailsUseCase);

export {
  EventDetailsUseCase
};
