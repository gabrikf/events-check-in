import z from "zod";
import { EventDetailDto } from "../../core/dtos/event-detals.dto";

export const eventDetailsParamsInputSchema = z.object({
  id: z.string().uuid(),
});

export const eventDetailsOutputSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  details: z.string().nullable(),
  slug: z.string(),
  maximumAttendees: z.number().int().positive().nullable(),
  attendeesAmount: z.number().int().positive(),
});
