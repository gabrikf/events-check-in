import {
  PrismaEventRepository
} from "./chunk-QYGZDF4V.mjs";

// src/infra/container/event.container.ts
import { container } from "tsyringe";
container.registerSingleton(
  "EventRepository" /* Event */,
  PrismaEventRepository
);
