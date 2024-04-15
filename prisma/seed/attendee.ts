import { AttendeeEntity } from "../../src/core/entities/attendee/attendee.entity";
import { event } from "./event";
import { PrismaTransaction } from "./index";

export const attendee = AttendeeEntity.create({
  name: "Test",
  email: "test@attendee.com",
  eventId: event.id,
});

export async function createAttendee(tx: PrismaTransaction) {
  const alreadyCreated = await tx.attendee.findUnique({
    where: {
      email_eventId: {
        email: attendee.email,
        eventId: attendee.eventId,
      },
    },
  });
  if (!alreadyCreated)
    return tx.attendee.create({
      data: attendee,
    });
  return alreadyCreated;
}
