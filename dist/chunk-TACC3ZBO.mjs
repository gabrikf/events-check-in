import {
  PrismaEventRepository
} from "./chunk-GFW5S5BU.mjs";

// src/infra/container/event.container.ts
import { container } from "tsyringe";
container.registerSingleton(
  "EventRepository" /* Event */,
  PrismaEventRepository
);
