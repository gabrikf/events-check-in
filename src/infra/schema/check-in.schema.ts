import z from "zod";

export const checkInParamsSchema = z.object({
  id: z.coerce.number(),
});

export const checkInOutputSchema = z.null();
