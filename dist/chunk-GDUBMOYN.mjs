import {
  generateSlug
} from "./chunk-5KVUHJLJ.mjs";

// src/core/entities/event.entity.ts
import { randomUUID } from "crypto";
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
    const id = randomUUID();
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

export {
  EventEntity
};
