import { beforeEach, describe, expect, it } from "vitest";
import { CreateEventUseCase } from "./create-event.use-case";
import { IEventRepository } from "../../repositories/event.repository";
import { InMemoryAttendeeRepository } from "../../repositories/in-memory/in-memory-attendee.repository";
import { InMemoryEventRepository } from "../../repositories/in-memory/in-memory-event.repository";
import { isUuid } from "../../../utils/regex/is-uuid";
import { generateSlug } from "../../../utils/generate-slug";
import { ConflictError } from "../../errors/conflict.error";
import { getInMemoryFactory } from "../../repositories/in-memory";

describe("Create Event Use Case", () => {
  let eventRepository: IEventRepository;
  let createEventUseCase: CreateEventUseCase;
  beforeEach(async () => {
    const { inMemoryEventRepository } = getInMemoryFactory();
    eventRepository = inMemoryEventRepository;
    createEventUseCase = new CreateEventUseCase(eventRepository);
  });
  it("should create a event given only mandatory props", async () => {
    const event = await createEventUseCase.execute({
      title: "test",
    });
    expect(event.id).toMatch(isUuid);
    expect(event.title).toBe("test");
    expect(event.details).toBeNull();
    expect(event.maximumAttendees).toBeNull();
    expect(event.slug).toBe(generateSlug(event.title));
  });

  it("should create a event given all props ", async () => {
    const event = await createEventUseCase.execute({
      title: "test",
      details: "testing",
      maximumAttendees: 100,
    });
    expect(event.id).toMatch(isUuid);
    expect(event.title).toBe("test");
    expect(event.details).toBe("testing");
    expect(event.maximumAttendees).toBe(100);
    expect(event.slug).toBe(generateSlug(event.title));
  });

  it("should throw error when slug is already used", async () => {
    await createEventUseCase.execute({
      title: "test",
    });
    expect(async () => {
      await createEventUseCase.execute({
        title: "test",
      });
    }).rejects.toBeInstanceOf(ConflictError);
  });
});
