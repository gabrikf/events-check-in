import z from "zod";

export const getAttendeeBadgeParamsSchema = z.object({
  id: z.coerce.number(),
});

export const getAttendeeBadgeOutputSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  eventTitle: z.string(),
  checkInUrl: z.string().url(),
});
