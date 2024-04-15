import { EventEntity } from "../../src/core/entities/event/event.entity";
import { PrismaTransaction } from "./index";

export const event = EventEntity.create({
  title: "Test",
  details: "Test details",
  maximumAttendees: 100,
});
export async function createEvent(tx: PrismaTransaction) {
  const alreadyCreated = await tx.event.findUnique({
    where: {
      id: event.id,
    },
  });
  if (!alreadyCreated) {
    return tx.event.create({
      data: event,
    });
  }
  return alreadyCreated;
}
