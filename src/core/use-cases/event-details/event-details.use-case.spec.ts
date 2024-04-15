import { beforeEach, describe, expect, it } from "vitest";
import { IEventRepository } from "../../repositories/event.repository";
import { InMemoryEventRepository } from "../../repositories/in-memory/in-memory-event.repository";
import { EventDetailsUseCase } from "./event-details.use-case";
import { EventEntity } from "../../entities/event/event.entity";
import { AttendeeEntity } from "../../entities/attendee/attendee.entity";
import { IAttendeeRepository } from "../../repositories/attendee.repository";
import { InMemoryAttendeeRepository } from "../../repositories/in-memory/in-memory-attendee.repository";
import { isUuid } from "../../../utils/regex/is-uuid";
import { generateSlug } from "../../../utils/generate-slug";
import { NotFoundError } from "../../errors/not-found.error";
import { getInMemoryFactory } from "../../repositories/in-memory";

describe("Event Details Use Case", () => {
  let eventRepository: IEventRepository;
  let attendeeRepository: IAttendeeRepository;
  let eventDetailsUseCase: EventDetailsUseCase;
  const event = EventEntity.create({
    title: "test",
  });
  const attendee = AttendeeEntity.create({
    email: "testing@test.com",
    name: "Testing",
    eventId: event.id,
  });
  beforeEach(async () => {
    const { inMemoryEventRepository, inMemoryAttendeeRepository } =
      getInMemoryFactory();
    eventRepository = inMemoryEventRepository;
    attendeeRepository = inMemoryAttendeeRepository;
    eventDetailsUseCase = new EventDetailsUseCase(eventRepository);
    await eventRepository.insert(event);
  });
  it("should return an event detail with no participants when no attendees have subscribed", async () => {
    const eventDetail = await eventDetailsUseCase.execute(event.id);
    expect(eventDetail.id).toMatch(isUuid);
    expect(eventDetail.title).toBe("test");
    expect(eventDetail.details).toBeNull();
    expect(eventDetail.maximumAttendees).toBeNull();
    expect(eventDetail.slug).toBe(generateSlug(event.title));
    expect(eventDetail.attendeesAmount).toBe(0);
  });

  it("should return an event detail with 1 participants when 1 attendees has subscribed", async () => {
    await attendeeRepository.insert(attendee);
    const eventDetail = await eventDetailsUseCase.execute(event.id);
    expect(eventDetail.id).toMatch(isUuid);
    expect(eventDetail.title).toBe("test");
    expect(eventDetail.details).toBeNull();
    expect(eventDetail.maximumAttendees).toBeNull();
    expect(eventDetail.slug).toBe(generateSlug(event.title));
    expect(eventDetail.attendeesAmount).toBe(1);
  });

  it("should throw error when event id does not exist", () => {
    expect(async () => {
      await eventDetailsUseCase.execute("wrong-id");
    }).rejects.toBeInstanceOf(NotFoundError);
  });
});
