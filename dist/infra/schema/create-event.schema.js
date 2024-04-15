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

// src/infra/schema/create-event.schema.ts
var create_event_schema_exports = {};
__export(create_event_schema_exports, {
  createEventInputSchema: () => createEventInputSchema,
  createEventOutputSchema: () => createEventOutputSchema
});
module.exports = __toCommonJS(create_event_schema_exports);
var import_zod = require("zod");
var createEventInputSchema = import_zod.z.object({
  title: import_zod.z.string().min(4),
  details: import_zod.z.string().nullable(),
  maximumAttendees: import_zod.z.number().int().positive().nullable()
});
var createEventOutputSchema = import_zod.z.object({
  id: import_zod.z.string().uuid(),
  title: import_zod.z.string().min(4),
  details: import_zod.z.string().nullable(),
  slug: import_zod.z.string(),
  maximumAttendees: import_zod.z.number().int().positive().nullable()
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createEventInputSchema,
  createEventOutputSchema
});
