import {
  PaginationInputDto
} from "./chunk-HQS6OF3G.mjs";

// src/core/dtos/get-all-attendees-paginated.dto.ts
var GetAllAttendeesPaginated = class extends PaginationInputDto {
  eventId;
  constructor({ eventId, ...rest }) {
    super(rest);
    this.eventId = eventId;
  }
};

export {
  GetAllAttendeesPaginated
};
