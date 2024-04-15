// src/core/dtos/event-detals.dto.ts
var EventDetailDto = class {
  id;
  title;
  details;
  slug;
  maximumAttendees;
  attendeesAmount;
  constructor(props) {
    this.id = props.id;
    this.title = props.title;
    this.details = props.details ?? null;
    this.slug = props.slug;
    this.maximumAttendees = props.maximumAttendees;
    this.attendeesAmount = props.attendeesAmount;
  }
};

export {
  EventDetailDto
};
