import { AttendeeEntity } from "../../../../core/entities/attendee/attendee.entity";
import { prisma } from "../../prisma";

export async function resetDb() {
  await prisma.$transaction([
    prisma.attendee.deleteMany(),
    prisma.event.deleteMany(),
  ]);

  AttendeeEntity.reset();
}
