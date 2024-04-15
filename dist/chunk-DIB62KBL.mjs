import {
  PrismaAttendeeRepository
} from "./chunk-TYNFOKSY.mjs";

// src/infra/container/attendee.container.ts
import { container } from "tsyringe";
container.registerSingleton(
  "AttendeeRepository" /* Attendee */,
  PrismaAttendeeRepository
);
