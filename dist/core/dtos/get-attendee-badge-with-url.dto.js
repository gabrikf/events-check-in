"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/core/dtos/get-attendee-badge-with-url.dto.ts
var get_attendee_badge_with_url_dto_exports = {};
__export(get_attendee_badge_with_url_dto_exports, {
  GetAttendeeBadgeWithUrl: () => GetAttendeeBadgeWithUrl
});
module.exports = __toCommonJS(get_attendee_badge_with_url_dto_exports);

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GetAttendeeBadgeWithUrl
});
