import { beforeEach, describe, expect, it } from "vitest";
import { CheckInUseCase } from "./check-in.use-case";
import { IAttendeeRepository } from "../../repositories/attendee.repository";
import { InMemoryAttendeeRepository } from "../../repositories/in-memory/in-memory-attendee.repository";
import { AttendeeEntity } from "../../entities/attendee/attendee.entity";
import { randomUUID } from "node:crypto";
import "reflect-metadata";
import { NotFoundError } from "../../errors/not-found.error";
import { ConflictError } from "../../errors/conflict.error";
import { getInMemoryFactory } from "../../repositories/in-memory";

describe("Check In Use Case", () => {
  let checkInUseCase: CheckInUseCase;
  let attendeeRepository: IAttendeeRepository;
  let attendee = AttendeeEntity.create({
    name: "test",
    email: "test@test.com",
    eventId: randomUUID(),
  });
  beforeEach(async () => {
    const { inMemoryAttendeeRepository } = getInMemoryFactory();
    attendeeRepository = inMemoryAttendeeRepository;
    checkInUseCase = new CheckInUseCase(attendeeRepository);
    await attendeeRepository.insert(attendee);
  });
  it("should check in an attendee", async () => {
    await checkInUseCase.execute(attendee.id);
    const attendeeAfterCheckIn = await attendeeRepository.findById(attendee.id);
    expect(attendeeAfterCheckIn?.checkedInAt).toBeInstanceOf(Date);
  });

  it("should throw and error when attendee do not exist", async () => {
    expect(async () => {
      await checkInUseCase.execute(123123123);
    }).rejects.toBeInstanceOf(NotFoundError);
  });

  it("should throw and error when attendee try to make more than one check-in", async () => {
    expect(async () => {
      await checkInUseCase.execute(attendee.id);
    }).rejects.toBeInstanceOf(ConflictError);
  });
});
