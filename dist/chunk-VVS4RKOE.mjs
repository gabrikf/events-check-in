// src/core/dtos/get-attendee-badge.dto.ts
var GetAttendeeBadgeDto = class {
  name;
  email;
  eventTitle;
  checkedInAt;
  constructor(props) {
    this.name = props.name;
    this.email = props.email;
    this.eventTitle = props.eventTitle;
    this.checkedInAt = props.checkedInAt ?? null;
  }
};

export {
  GetAttendeeBadgeDto
};
