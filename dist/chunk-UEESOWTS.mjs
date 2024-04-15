// src/infra/schema/create-event.schema.ts
import { z } from "zod";
var createEventInputSchema = z.object({
  title: z.string().min(4),
  details: z.string().nullable(),
  maximumAttendees: z.number().int().positive().nullable()
});
var createEventOutputSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(4),
  details: z.string().nullable(),
  slug: z.string(),
  maximumAttendees: z.number().int().positive().nullable()
});

export {
  createEventInputSchema,
  createEventOutputSchema
};
