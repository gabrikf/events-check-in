"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/infra/schema/get-all-attendees-by-event.schema.ts
var get_all_attendees_by_event_schema_exports = {};
__export(get_all_attendees_by_event_schema_exports, {
  getAllAttendeesByEventOutput: () => getAllAttendeesByEventOutput,
  getAllAttendeesByEventParamsInput: () => getAllAttendeesByEventParamsInput,
  getAllAttendeesByEventQueryInput: () => getAllAttendeesByEventQueryInput
});
module.exports = __toCommonJS(get_all_attendees_by_event_schema_exports);
var import_zod = __toESM(require("zod"));
var getAllAttendeesByEventParamsInput = import_zod.default.object({
  eventId: import_zod.default.string().uuid()
});
var getAllAttendeesByEventQueryInput = import_zod.default.object({
  page: import_zod.default.coerce.number(),
  limit: import_zod.default.coerce.number(),
  query: import_zod.default.string().nullish()
});
var getAllAttendeesByEventOutput = import_zod.default.object({
  data: import_zod.default.array(
    import_zod.default.object({
      id: import_zod.default.number(),
      name: import_zod.default.string(),
      email: import_zod.default.string().email(),
      createdAt: import_zod.default.date(),
      eventId: import_zod.default.string().uuid()
    })
  ),
  count: import_zod.default.number()
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getAllAttendeesByEventOutput,
  getAllAttendeesByEventParamsInput,
  getAllAttendeesByEventQueryInput
});
