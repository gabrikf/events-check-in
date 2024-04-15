import { beforeEach, describe, expect, it } from "vitest";
import { AttendeeEntity } from "../../entities/attendee/attendee.entity";
import { EventEntity } from "../../entities/event/event.entity";
import { NotFoundError } from "../../errors/not-found.error";
import { IAttendeeRepository } from "../../repositories/attendee.repository";
import { IEventRepository } from "../../repositories/event.repository";
import { getInMemoryFactory } from "../../repositories/in-memory";
import { GetAttendeeBadgeUseCase } from "./get-attendee-badge.use-case";

describe("Event Details Use Case", () => {
  let eventRepository: IEventRepository;
  let attendeeRepository: IAttendeeRepository;
  let getAttendeeBadgeUseCase: GetAttendeeBadgeUseCase;
  const event = EventEntity.create({
    title: "test",
  });
  const attendee = AttendeeEntity.create({
    email: "testing@test.com",
    name: "Testing",
    eventId: event.id,
  });
  const protocol = "http";
  const hostname = "localhost";
  beforeEach(async () => {
    const { inMemoryEventRepository, inMemoryAttendeeRepository } =
      getInMemoryFactory();
    eventRepository = inMemoryEventRepository;
    attendeeRepository = inMemoryAttendeeRepository;
    getAttendeeBadgeUseCase = new GetAttendeeBadgeUseCase(attendeeRepository);
    await eventRepository.insert(event);
  });
  it("should return attendee badge by id", async () => {
    await attendeeRepository.insert(attendee);
    const badge = await getAttendeeBadgeUseCase.execute({
      id: attendee.id,
      protocol,
      hostname,
    });
    expect(badge.name).toBe(attendee.name);
    expect(badge.email).toBe(attendee.email);
    expect(badge.checkedInAt).toBeNull();
    expect(badge.eventTitle).toBeTypeOf("string");
    expect(badge.checkInUrl).toBe(
      `${protocol}://${hostname}/attendee/${attendee.id}/check-in`
    );
  });
  it("should throw an error when attendee does not exist", () => {
    expect(async () => {
      await getAttendeeBadgeUseCase.execute({
        id: 123123,
        protocol,
        hostname,
      });
    }).rejects.toBeInstanceOf(NotFoundError);
  });
});
