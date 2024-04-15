// src/infra/schema/event-details.schema.ts
import z from "zod";
var eventDetailsParamsInputSchema = z.object({
  id: z.string().uuid()
});
var eventDetailsOutputSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  details: z.string().nullable(),
  slug: z.string(),
  maximumAttendees: z.number().int().positive().nullable(),
  attendeesAmount: z.number().int().positive()
});

export {
  eventDetailsParamsInputSchema,
  eventDetailsOutputSchema
};
