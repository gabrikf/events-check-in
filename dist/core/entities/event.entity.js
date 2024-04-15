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

// src/core/entities/event.entity.ts
var event_entity_exports = {};
__export(event_entity_exports, {
  EventEntity: () => EventEntity
});
module.exports = __toCommonJS(event_entity_exports);
var import_crypto = require("crypto");

// src/utils/generate-slug.ts
function generateSlug(title) {
  const slug = title.toLowerCase().replace(/\s+/g, "-");
  return slug;
}

// src/core/entities/event.entity.ts
var EventEntity = class _EventEntity {
  id;
  title;
  details;
  slug;
  maximumAttendees;
  constructor(props) {
    this.id = props.id;
    this.title = props.title;
    this.details = props.details ?? null;
    this.slug = props.slug;
    this.maximumAttendees = props.maximumAttendees ?? null;
  }
  static create({ title, details, maximumAttendees }) {
    const id = (0, import_crypto.randomUUID)();
    const slug = generateSlug(title);
    const event = new _EventEntity({
      id,
      title,
      details,
      slug,
      maximumAttendees
    });
    return event;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  EventEntity
});
