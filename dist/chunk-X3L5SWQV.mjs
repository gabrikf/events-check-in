// src/infra/schema/get-attendee-badge.schema.ts
import z from "zod";
var getAttendeeBadgeParamsSchema = z.object({
  id: z.string().transform(Number)
});
var getAttendeeBadgeOutputSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  eventTitle: z.string(),
  checkInUrl: z.string().url()
});

export {
  getAttendeeBadgeParamsSchema,
  getAttendeeBadgeOutputSchema
};
