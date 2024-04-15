import z from "zod";
import { AttendeeEntity } from "../../core/entities/attendee/attendee.entity";
import { Prisma } from "@prisma/client";
import { mockFactory } from "../../utils/mock.factory";

export const registerBodyInputSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
});

export const registerParamsInputSchema = z.object({
  eventId: z.string().uuid(),
});

export const registerOutputSchema = z.object({
  id: z.number().int(),
  createdAt: z.date(),
  email: z.string().email(),
  eventId: z.string().uuid(),
  name: z.string().min(3),
});

export const attendeeFactory = mockFactory(registerBodyInputSchema);
