import {
  PrismaAttendeeRepository
} from "./chunk-ZVPOZV3J.mjs";

// src/infra/container/attendee.container.ts
import { container } from "tsyringe";
container.registerSingleton(
  "AttendeeRepository" /* Attendee */,
  PrismaAttendeeRepository
);
