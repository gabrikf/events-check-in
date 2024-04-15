import { container } from "tsyringe";
import { IAttendeeRepository } from "../../core/repositories/attendee.repository";
import { EContainer } from "./container.enum";
import { PrismaAttendeeRepository } from "../repositories/prisma-attendee.repository";

container.registerSingleton<IAttendeeRepository>(
  EContainer.Attendee,
  PrismaAttendeeRepository
);
