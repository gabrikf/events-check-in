import {
  PrismaAttendeeRepository
} from "./chunk-Y3YNDX25.mjs";

// src/infra/container/attendee.container.ts
import { container } from "tsyringe";
container.registerSingleton(
  "AttendeeRepository" /* Attendee */,
  PrismaAttendeeRepository
);
