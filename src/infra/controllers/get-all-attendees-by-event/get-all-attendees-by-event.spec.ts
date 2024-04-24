import { beforeEach, describe, expect, it } from "vitest";
import { app } from "../../../app";
import request from "supertest";
import { prisma } from "../../lib/prisma";
import { AttendeeEntity } from "../../../core/entities/attendee/attendee.entity";
import { EventEntity } from "../../../core/entities/event/event.entity";
import { setupTests } from "../../lib/vitest/helpers/beforeEachE2E";
import { randomUUID } from "crypto";
import { getErrorMessage } from "../../lib/vitest/helpers/getValidationError";
import { VALIDATION_ERROR_MESSAGE } from "../../../utils/error-handler";

describe("Get All Attendees By Event E2E", () => {
  const total = 45;
  let event: EventEntity;
  let firstAttendee: AttendeeEntity;

  beforeEach(async () => {
    await app.ready();
    const { event: createdEvent } = await setupTests();
    event = createdEvent;
    await prisma.attendee.deleteMany();
    AttendeeEntity.reset();
    const [firstAttendeeCreated] = await prisma.$transaction(
      Array.from({ length: total }).map((_, i) => {
        const attendee = AttendeeEntity.create({
          email: `test${i + 1}@test.com`,
          name: `test ${i + 1}`,
          eventId: event.id,
        });

        return prisma.attendee.create({
          data: attendee,
        });
      })
    );
    firstAttendee = new AttendeeEntity(firstAttendeeCreated);
  });

  it("should return attendees paginated and count getting first 10 when page = 1", async () => {
    const page = 1;
    const limit = 10;
    const response = await request(app.server)
      .get(`/attendees/${event.id}/event`)
      .query({ page, limit });

    expect(response.body.count).toBe(total);
    expect(response.body.data.length).toBe(limit);
    expect(response.body.data[0].id).toBe(1);
  });

  it("should return filter by email using query params", async () => {
    const page = 1;
    const limit = 10;
    const email = firstAttendee.email;
    const response = await request(app.server)
      .get(`/attendees/${event.id}/event`)
      .query({ page, limit, query: email });

    expect(response.body.count).toBe(1);
    expect(response.body.data.length).toBe(1);
    expect(response.body.data[0].id).toBe(firstAttendee.id);
    expect(response.body.data[0].email).toBe(firstAttendee.email);
  });

  it("should return attendees paginated and count skipping first 10 when page = 2", async () => {
    const page = 2;
    const limit = 10;
    const response = await request(app.server)
      .get(`/attendees/${event.id}/event`)
      .query({ page, limit });

    expect(response.body.count).toBe(total);
    expect(response.body.data.length).toBe(limit);
    expect(response.body.data[0].id).toBe(11);
  });

  it("should return status 404(Not found) when event does not exist", async () => {
    const page = 2;
    const limit = 10;
    const response = await request(app.server)
      .get(`/attendees/${randomUUID()}/event`)
      .query({ page, limit });

    expect(response.status).toBe(404);
  });

  it("should return status 400(Bad request) with validation error when route-param is not a number", async () => {
    const page = 2;
    const limit = 10;
    const response = await request(app.server)
      .get(`/attendees/dawdaw/event`)
      .query({ page, limit });

    const errorMessage = getErrorMessage(response);
    expect(response.status).toBe(400);
    expect(errorMessage).toBe(VALIDATION_ERROR_MESSAGE);
  });
});
