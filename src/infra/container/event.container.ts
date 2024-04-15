import { container } from "tsyringe";
import { IEventRepository } from "../../core/repositories/event.repository";
import { EContainer } from "./container.enum";
import { PrismaEventRepository } from "../repositories/prisma-event.repository";

container.registerSingleton<IEventRepository>(
  EContainer.Event,
  PrismaEventRepository
);
