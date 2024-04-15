import z from "zod";
import { AttendeeEntity } from "../../core/entities/attendee/attendee.entity";

export const getAllAttendeesByEventParamsInput = z.object({
  eventId: z.string().uuid(),
});

export const getAllAttendeesByEventQueryInput = z.object({
  page: z.coerce.number(),
  limit: z.coerce.number(),
  query: z.string().nullish(),
});

export const getAllAttendeesByEventOutput = z.object({
  data: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      email: z.string().email(),
      createdAt: z.date(),
      eventId: z.string().uuid(),
    })
  ),
  count: z.number(),
});
