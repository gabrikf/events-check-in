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
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};
var __decorateParam = (index, decorator) => (target, key) => decorator(target, key, index);

// src/core/use-cases/get-all-attendees.use-case.ts
var get_all_attendees_use_case_exports = {};
__export(get_all_attendees_use_case_exports, {
  GetAllAttendeesByEventUseCase: () => GetAllAttendeesByEventUseCase
});
module.exports = __toCommonJS(get_all_attendees_use_case_exports);
var import_tsyringe = require("tsyringe");

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

// src/core/use-cases/get-all-attendees.use-case.ts
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
  (0, import_tsyringe.injectable)(),
  __decorateParam(0, (0, import_tsyringe.inject)("AttendeeRepository" /* Attendee */))
], GetAllAttendeesByEventUseCase);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GetAllAttendeesByEventUseCase
});
