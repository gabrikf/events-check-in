// src/infra/schema/check-in.schema.ts
import z from "zod";
var checkInParamsSchema = z.object({
  id: z.coerce.number()
});
var checkInOutputSchema = z.null();

export {
  checkInParamsSchema,
  checkInOutputSchema
};
