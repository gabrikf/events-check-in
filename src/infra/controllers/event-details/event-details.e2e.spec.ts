import { randomUUID } from "crypto";
import request from "supertest";
import { beforeEach, describe, expect, it } from "vitest";
import { app } from "../../../app";
import { VALIDATION_ERROR_MESSAGE } from "../../../utils/error-handler";
import { getErrorMessage } from "../../lib/vitest/helpers/getValidationError";
import { eventFactory } from "../../schema/create-event.schema";
import { eventDetailsOutputSchema } from "../../schema/event-details.schema";
import { attendeeFactory } from "../../schema/register.schema";
import { EventEntity } from "../../../core/entities/event/event.entity";
import { setupTests } from "../../lib/vitest/helpers/beforeEachE2E";

describe("Event Details E2E", () => {
  let event: EventEntity;

  beforeEach(async () => {
    await app.ready();
    const { event: setupEvent } = await setupTests();
    event = setupEvent;
  });

  it("should return event details by id matching with zod response", async () => {
    const response = await request(app.server).get(`/events/${event.id}`);
    expect(() => eventDetailsOutputSchema.parse(response.body)).not.toThrow();
    expect(response.status).toBe(200);
  });
  it("should should return data passed in the event creation route", async () => {
    const createEvent = eventFactory({ maximumAttendees: 100 });

    const createdEvent = await request(app.server)
      .post(`/events`)
      .send(createEvent);

    const response = await request(app.server).get(
      `/events/${createdEvent.body.id}`
    );

    expect(response.body.title).toBe(createEvent.title);
    expect(response.body.details).toBe(createEvent.details);
    expect(response.body.maximumAttendees).toBe(createEvent.maximumAttendees);
  });

  it("should return 404(Not found) status code when event does not exist", async () => {
    const response = await request(app.server).get(`/events/${randomUUID()}`);
    expect(response.status).toBe(404);
  });

  it("should throw an validation error when route-param in not an uuid", async () => {
    const response = await request(app.server).get(`/events/wrong-id}`);
    const errorMessage = getErrorMessage(response);
    expect(errorMessage).toBe(VALIDATION_ERROR_MESSAGE);
    expect(response.status).toBe(400);
  });

  it("should return validation amout = 3 when 3 attendees subscribed", async () => {
    await app.ready();
    const createEvent = eventFactory({ maximumAttendees: 100 });
    const attendee1 = attendeeFactory();
    const attendee2 = attendeeFactory();
    const attendee3 = attendeeFactory();
    const createdEvent = await request(app.server)
      .post(`/events`)
      .send(createEvent);
    await request(app.server)
      .post(`/events/${createdEvent.body.id}/attendee`)
      .send(attendee1);
    await request(app.server)
      .post(`/events/${createdEvent.body.id}/attendee`)
      .send(attendee2);
    await request(app.server)
      .post(`/events/${createdEvent.body.id}/attendee`)
      .send(attendee3);

    const response = await request(app.server).get(
      `/events/${createdEvent.body.id}`
    );

    expect(response.status).toBe(200);
    expect(response.body.attendeesAmount).toBe(3);
  });
});
