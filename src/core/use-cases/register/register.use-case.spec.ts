import { beforeEach, describe, expect, it } from "vitest";
import { IEventRepository } from "../../repositories/event.repository";
import { IAttendeeRepository } from "../../repositories/attendee.repository";
import { RegisterUseCase } from "./register.use-case";
import { getInMemoryFactory } from "../../repositories/in-memory";
import { EventEntity } from "../../entities/event/event.entity";
import { isUuid } from "../../../utils/regex/is-uuid";
import { NotFoundError } from "../../errors/not-found.error";
import { ForbiddenError } from "../../errors/forbidden.error";
import { ConflictError } from "../../errors/conflict.error";

describe("Register Use Case", () => {
  let eventRepository: IEventRepository;
  let attendeeRepository: IAttendeeRepository;
  let registerUseCase: RegisterUseCase;
  const event = EventEntity.create({
    title: "test",
    details: "test",
    maximumAttendees: 2,
  });

  beforeEach(async () => {
    const { inMemoryEventRepository, inMemoryAttendeeRepository } =
      getInMemoryFactory();
    eventRepository = inMemoryEventRepository;
    attendeeRepository = inMemoryAttendeeRepository;
    registerUseCase = new RegisterUseCase(attendeeRepository, eventRepository);
    await eventRepository.insert(event);
  });

  it("should register a attendee", async () => {
    const result = await registerUseCase.execute({
      email: "test@test.com",
      name: "test",
      eventId: event.id,
    });
    expect(result.id).toBeTypeOf("number");
    expect(result.email).toBe("test@test.com");
    expect(result.name).toBe("test");
    expect(result.checkedInAt).toBeNull();
    expect(result.createdAt).toBeInstanceOf(Date);
    expect(result.eventId).toBe(event.id);
  });

  it("should throw a not found error when event does not exist", async () => {
    expect(async () => {
      await registerUseCase.execute({
        email: "test@test.com",
        name: "test",
        eventId: "wrong-id",
      });
    }).rejects.toBeInstanceOf(NotFoundError);
  });

  it("should throw forbidden error when register a attendee in a event which retched max attendees amount", async () => {
    Array.from({ length: 2 }).map(async (_, i) => {
      await registerUseCase.execute({
        email: `test${i}@test.com`,
        name: "test",
        eventId: event.id,
      });

      expect(async () => {
        await registerUseCase.execute({
          email: "test2@test.com",
          name: "test",
          eventId: event.id,
        });
      }).rejects.toBeInstanceOf(ForbiddenError);
    });
  });
  it("should throw conflict error when register a attendee with an email already registered", async () => {
    await registerUseCase.execute({
      email: "test@test.com",
      name: "test",
      eventId: event.id,
    });

    expect(async () => {
      await registerUseCase.execute({
        email: "test@test.com",
        name: "test",
        eventId: event.id,
      });
    }).rejects.toBeInstanceOf(ConflictError);
  });
});
