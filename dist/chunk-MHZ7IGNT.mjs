// src/infra/schema/register.schema.ts
import z from "zod";
var registerBodyInputSchema = z.object({
  name: z.string().min(3),
  email: z.string().email()
});
var registerParamsInputSchema = z.object({
  eventId: z.string().uuid()
});
var registerOutputSchema = z.object({
  id: z.number().int(),
  createdAt: z.date(),
  email: z.string().email(),
  eventId: z.string().uuid(),
  name: z.string().min(3)
});

export {
  registerBodyInputSchema,
  registerParamsInputSchema,
  registerOutputSchema
};
