import { DefaultArgs } from "@prisma/client/runtime/library";
import { prisma } from "../../src/infra/lib/prisma";
import { createAttendee } from "./attendee";
import { createEvent } from "./event";
import { Prisma, PrismaClient } from "@prisma/client";

export type PrismaTransaction = Omit<
  PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>,
  "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends"
>;

async function main() {
  await prisma.$transaction(async (tx) => {
    const createdEvent = await createEvent(tx);
    const createdAttendee = await createAttendee(tx);
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
