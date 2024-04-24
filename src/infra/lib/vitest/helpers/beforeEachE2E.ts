import { beforeEach } from "vitest";

import { AttendeeEntity } from "../../../../core/entities/attendee/attendee.entity";
import { EventEntity } from "../../../../core/entities/event/event.entity";
import { prisma } from "../../prisma";
import { resetDb } from "./reset-db";

export async function setupTests() {
  await resetDb();

  const { event, attendee } = await prisma.$transaction(async (tx) => {
    const event = await tx.event.create({
      data: EventEntity.create({
        title: "Title test",
        details: "Details test",
        maximumAttendees: 100,
      }),
    });
    const attendee = await tx.attendee.create({
      data: AttendeeEntity.create({
        name: "Attendee test",
        email: "attendee@test.com",
        eventId: event.id,
      }),
    });
    return {
      event,
      attendee,
    };
  });

  return {
    event: new EventEntity(event),
    attendee: new AttendeeEntity(attendee),
  };
}
