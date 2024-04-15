import { describe, expect, it } from "vitest";
import { EventEntity } from "./event.entity";
import { isUuid } from "../../../utils/regex/is-uuid";
import { generateSlug } from "../../../utils/generate-slug";
import { AttendeeEntity } from "../attendee/attendee.entity";
import { randomUUID } from "crypto";

describe("Event entity", () => {
  describe("Create", () => {
    it("should create a event and generate a slug given title=Testing", () => {
      const createdEntity = EventEntity.create({
        title: "Testing",
      });
      expect(createdEntity.id).toMatch(isUuid);
      expect(createdEntity.title).toBe("Testing");
      expect(createdEntity.details).toBeNull();
      expect(createdEntity.maximumAttendees).toBeNull();
      expect(createdEntity.slug).toBe(generateSlug(createdEntity.title));
    });

    it("should create a event given title=Testing / details=Testing", () => {
      const createdEntity = EventEntity.create({
        title: "Testing",
        details: "Testing",
      });
      expect(createdEntity.id).toMatch(isUuid);
      expect(createdEntity.title).toBe("Testing");
      expect(createdEntity.details).toBe("Testing");
      expect(createdEntity.maximumAttendees).toBeNull();
      expect(createdEntity.slug).toBe(generateSlug(createdEntity.title));
    });
    it("should create a event given title=Testing / details=Testing / maximumAttendees=100", () => {
      const createdEntity = EventEntity.create({
        title: "Testing",
        details: "Testing",
        maximumAttendees: 100,
      });
      expect(createdEntity.id).toMatch(isUuid);
      expect(createdEntity.title).toBe("Testing");
      expect(createdEntity.details).toBe("Testing");
      expect(createdEntity.maximumAttendees).toBe(100);
      expect(createdEntity.slug).toBe(generateSlug(createdEntity.title));
    });
  });

  describe("Constructor", () => {
    it("should create a new entity given all props", () => {
      const instance = new EventEntity({
        id: randomUUID(),
        title: "Testing",
        details: "Testing",
        maximumAttendees: 100,
        slug: "testing",
      });
      expect(instance.id).toMatch(isUuid);
      expect(instance.title).toBe("Testing");
      expect(instance.details).toBe("Testing");
      expect(instance.maximumAttendees).toBe(100);
      expect(instance.slug).toBe("testing");
    });
    it("should create a new entity not given the optional props and set then to null", () => {
      const instance = new EventEntity({
        id: randomUUID(),
        title: "Testing",
        slug: "testing",
      });
      expect(instance.id).toMatch(isUuid);
      expect(instance.title).toBe("Testing");
      expect(instance.details).toBeNull();
      expect(instance.maximumAttendees).toBeNull();
      expect(instance.slug).toBe("testing");
    });
  });
});
