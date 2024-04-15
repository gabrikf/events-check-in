import {
  GetAttendeeBadgeDto
} from "./chunk-VVS4RKOE.mjs";

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

export {
  GetAttendeeBadgeWithUrl
};
