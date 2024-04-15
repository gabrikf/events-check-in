import {
  PrismaAttendeeRepository
} from "./chunk-YNOOP63U.mjs";

// src/infra/container/attendee.container.ts
import { container } from "tsyringe";
container.registerSingleton(
  "AttendeeRepository" /* Attendee */,
  PrismaAttendeeRepository
);
