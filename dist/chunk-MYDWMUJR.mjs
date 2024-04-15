// src/infra/schema/get-all-attendees-by-event.schema.ts
import z from "zod";
var getAllAttendeesByEventParamsInput = z.object({
  eventId: z.string().uuid()
});
var getAllAttendeesByEventQueryInput = z.object({
  page: z.coerce.number(),
  limit: z.coerce.number(),
  query: z.string().nullish()
});
var getAllAttendeesByEventOutput = z.object({
  data: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      email: z.string().email(),
      createdAt: z.date(),
      eventId: z.string().uuid()
    })
  ),
  count: z.number()
});

export {
  getAllAttendeesByEventParamsInput,
  getAllAttendeesByEventQueryInput,
  getAllAttendeesByEventOutput
};
