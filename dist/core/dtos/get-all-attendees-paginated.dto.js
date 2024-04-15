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

// src/core/dtos/get-all-attendees-paginated.dto.ts
var get_all_attendees_paginated_dto_exports = {};
__export(get_all_attendees_paginated_dto_exports, {
  GetAllAttendeesPaginated: () => GetAllAttendeesPaginated
});
module.exports = __toCommonJS(get_all_attendees_paginated_dto_exports);

// src/core/dtos/shared/pagination.dto.ts
var PaginationInputDto = class {
  take;
  skip;
  query;
  constructor(props) {
    this.take = props.limit;
    this.skip = (props.page - 1) * props.limit;
    this.query = props.query ?? null;
  }
};

// src/core/dtos/get-all-attendees-paginated.dto.ts
var GetAllAttendeesPaginated = class extends PaginationInputDto {
  eventId;
  constructor({ eventId, ...rest }) {
    super(rest);
    this.eventId = eventId;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GetAllAttendeesPaginated
});
