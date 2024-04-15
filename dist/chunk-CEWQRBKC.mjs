import {
  GetAllAttendeesPaginated
} from "./chunk-QRMOPZXB.mjs";
import {
  __decorateClass,
  __decorateParam
} from "./chunk-WZGJBVCM.mjs";

// src/core/use-cases/get-all-attendees.use-case.ts
import { inject, injectable } from "tsyringe";
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
  injectable(),
  __decorateParam(0, inject("AttendeeRepository" /* Attendee */))
], GetAllAttendeesByEventUseCase);

export {
  GetAllAttendeesByEventUseCase
};
