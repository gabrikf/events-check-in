import {
  EventEntity
} from "./chunk-GDUBMOYN.mjs";
import {
  ConflictError
} from "./chunk-KJ3BH632.mjs";
import {
  __decorateClass,
  __decorateParam
} from "./chunk-WZGJBVCM.mjs";

// src/core/use-cases/create-event.use-case.ts
import { inject, injectable } from "tsyringe";
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
  injectable(),
  __decorateParam(0, inject("EventRepository" /* Event */))
], CreateEventUseCase);

export {
  CreateEventUseCase
};
