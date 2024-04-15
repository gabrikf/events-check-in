import { describe, expect, it } from "vitest";
import { EventEntity } from "../event/event.entity";
import { beforeEach } from "node:test";
import { AttendeeEntity } from "./attendee.entity";

describe("Attendee Entity", () => {
  const event = EventEntity.create({
    title: "test",
  });

  describe("Create", () => {
    it("should create a attendee given email=test@test.com / name=test eventId=(created-event-id)", () => {
      const createdAttendee = AttendeeEntity.create({
        email: "test@test.com",
        name: "test",
        eventId: event.id,
      });
      expect(typeof createdAttendee.id).toBe("number");
      expect(createdAttendee.email).toBe("test@test.com");
      expect(createdAttendee.name).toBe("test");
      expect(createdAttendee.checkedInAt).toBeNull();
      expect(createdAttendee.createdAt).toBeInstanceOf(Date);
      expect(createdAttendee.eventId).toBe(event.id);
    });
  });

  describe("Check in", () => {
    it("should check in when call checkIn()", () => {
      const createdAttendee = AttendeeEntity.create({
        email: "test@test.com",
        name: "test",
        eventId: event.id,
      });
      createdAttendee.checkIn();
      expect(typeof createdAttendee.id).toBe("number");

      expect(createdAttendee.checkedInAt).toBeInstanceOf(Date);
    });
    it("should check in when call checkIn(date)", () => {
      const createdAttendee = AttendeeEntity.create({
        email: "test@test.com",
        name: "test",
        eventId: event.id,
      });
      const date = new Date();
      createdAttendee.checkIn(date);
      expect(typeof createdAttendee.id).toBe("number");

      expect(createdAttendee.checkedInAt).toStrictEqual(date);
    });
  });

  describe("Constructor", () => {
    it("should instance a new attendee given all props", () => {
      const createdAttendee = new AttendeeEntity({
        id: 1,
        email: "test@test.com",
        name: "test",
        eventId: event.id,
        createdAt: new Date(),
        checkedInAt: new Date(),
      });
      expect(typeof createdAttendee.id).toBe("number");
      expect(createdAttendee.email).toBe("test@test.com");
      expect(createdAttendee.name).toBe("test");
      expect(createdAttendee.checkedInAt).toBeInstanceOf(Date);
      expect(createdAttendee.createdAt).toBeInstanceOf(Date);
      expect(createdAttendee.eventId).toBe(event.id);
    });
    it("should instance a new attendee given only mandatory fields", () => {
      const createdAttendee = new AttendeeEntity({
        id: 1,
        email: "test@test.com",
        name: "test",
        eventId: event.id,
        createdAt: new Date(),
      });
      expect(typeof createdAttendee.id).toBe("number");
      expect(createdAttendee.email).toBe("test@test.com");
      expect(createdAttendee.name).toBe("test");
      expect(createdAttendee.checkedInAt).toBeNull();
      expect(createdAttendee.createdAt).toBeInstanceOf(Date);
      expect(createdAttendee.eventId).toBe(event.id);
    });
  });
});
