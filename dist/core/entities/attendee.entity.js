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

// src/core/entities/attendee.entity.ts
var attendee_entity_exports = {};
__export(attendee_entity_exports, {
  AttendeeEntity: () => AttendeeEntity
});
module.exports = __toCommonJS(attendee_entity_exports);
var AttendeeEntity = class _AttendeeEntity {
  id;
  name;
  email;
  createdAt;
  eventId;
  checkedInAt;
  static lastId = 0;
  constructor(props) {
    this.id = props.id;
    this.name = props.name;
    this.email = props.email;
    this.createdAt = props.createdAt;
    this.eventId = props.eventId;
    this.checkedInAt = props.checkedInAt ?? null;
  }
  static create({ email, eventId, name }) {
    const id = ++_AttendeeEntity.lastId;
    const createdAt = /* @__PURE__ */ new Date();
    const attendee = new _AttendeeEntity({
      id,
      name,
      email,
      createdAt,
      eventId
    });
    return attendee;
  }
  checkIn() {
    this.checkedInAt = /* @__PURE__ */ new Date();
    return this;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AttendeeEntity
});
