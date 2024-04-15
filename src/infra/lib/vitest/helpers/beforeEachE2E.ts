import { beforeEach } from "vitest";

import { resetDb } from "./reset-db";
import { EventEntity } from "../../../../core/entities/event/event.entity";
import { AttendeeEntity } from "../../../../core/entities/attendee/attendee.entity";
import { prisma } from "../../prisma";
import { app } from "../../../../server";

export const event = EventEntity.create({
  title: "Title test",
  details: "Details test",
  maximumAttendees: 100,
});

export const attendee = AttendeeEntity.create({
  name: "Attendee test",
  email: "attendee@test.com",
  eventId: event.id,
});

export async function beforeEachE2E(callBack?: () => unknown) {
  return beforeEach(async () => {
    await app.ready();
    await resetDb();
    await prisma.event.create({
      data: event,
    });
    await prisma.attendee.create({
      data: attendee,
    });
    callBack && callBack();
  });
}
