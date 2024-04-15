import { z } from "zod";
import { mockFactory } from "../../utils/mock.factory";

export const createEventInputSchema = z.object({
  title: z.string().min(4),
  details: z.string().nullish(),
  maximumAttendees: z.number().int().positive().nullish(),
});

export const createEventOutputSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(4),
  details: z.string().nullable(),
  slug: z.string(),
  maximumAttendees: z.number().int().positive().max(50000).nullable(),
});

export type CreateEventInput = z.infer<typeof createEventInputSchema>;

export const eventFactory = mockFactory(createEventInputSchema);
