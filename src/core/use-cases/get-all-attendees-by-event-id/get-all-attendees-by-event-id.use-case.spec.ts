import { beforeEach, describe, expect, it } from "vitest";
import { AttendeeEntity } from "../../entities/attendee/attendee.entity";
import { EventEntity } from "../../entities/event/event.entity";
import { IAttendeeRepository } from "../../repositories/attendee.repository";
import { IEventRepository } from "../../repositories/event.repository";
import { GetAllAttendeesByEventUseCase } from "./get-all-attendees-by-event-id.use-case";
import { InMemoryAttendeeRepository } from "../../repositories/in-memory/in-memory-attendee.repository";
import { InMemoryEventRepository } from "../../repositories/in-memory/in-memory-event.repository";
import { getInMemoryFactory } from "../../repositories/in-memory";

describe("Get all attendees by event Use Case", () => {
  let eventRepository: IEventRepository;
  let attendeeRepository: IAttendeeRepository;
  let getAllAttendeesByEventUseCase: GetAllAttendeesByEventUseCase;
  const event = EventEntity.create({
    title: "test",
  });
  const attendees = Array.from({ length: 45 }).map((_, i) => {
    return AttendeeEntity.create({
      email: `testing${i}@test.com`,
      name: `Testing ${i}`,
      eventId: event.id,
    });
  });
  beforeEach(async () => {
    const { inMemoryEventRepository, inMemoryAttendeeRepository } =
      getInMemoryFactory();
    eventRepository = inMemoryEventRepository;
    attendeeRepository = inMemoryAttendeeRepository;
    getAllAttendeesByEventUseCase = new GetAllAttendeesByEventUseCase(
      attendeeRepository
    );
    await eventRepository.insert(event);
    await attendeeRepository.bulkInsert(attendees);
  });
  it("should return attendees from a event paginated, returning first 10 results when page = 1 / limit = 10", async () => {
    const result = await getAllAttendeesByEventUseCase.execute({
      eventId: event.id,
      page: 1,
      limit: 10,
    });
    expect(result.data.length).toBe(10);
    expect(result.data[0]).toBe(attendees[0]);
    expect(result.count).toBe(attendees.length);
  });

  it("should return attendees from a event paginated, returning skip first 10 results when page = 2 / limit = 10", async () => {
    const result = await getAllAttendeesByEventUseCase.execute({
      eventId: event.id,
      page: 2,
      limit: 10,
    });
    expect(result.data.length).toBe(10);
    expect(result.data[0]).toBe(attendees[10]);
    expect(result.count).toBe(attendees.length);
  });
  it("should return search by name", async () => {
    const attendeeToSearch = AttendeeEntity.create({
      name: "Search Value",
      email: "test@test.com",
      eventId: event.id,
    });
    await attendeeRepository.insert(attendeeToSearch);
    const result = await getAllAttendeesByEventUseCase.execute({
      eventId: event.id,
      page: 1,
      limit: 10,
      searchText: "Search Value",
    });
    expect(result.data[0].name).toBe(attendeeToSearch.name);
    expect(result.data.length).toBe(1);
    expect(result.count).toBe(1);
  });
  it("should return search by email", async () => {
    const attendeeToSearch = AttendeeEntity.create({
      name: "Search Value",
      email: "test@test.com",
      eventId: event.id,
    });
    await attendeeRepository.insert(attendeeToSearch);
    const result = await getAllAttendeesByEventUseCase.execute({
      eventId: event.id,
      page: 1,
      limit: 10,
      searchText: "test@",
    });
    expect(result.data[0].email).toBe(attendeeToSearch.email);
    expect(result.data.length).toBe(1);
    expect(result.count).toBe(1);
  });
});
