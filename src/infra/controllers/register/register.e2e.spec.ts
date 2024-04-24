import { describe, it, beforeEach, expect } from "vitest";
import { EventEntity } from "../../../core/entities/event/event.entity";
import { setupTests } from "../../lib/vitest/helpers/beforeEachE2E";
import request from "supertest";
import { app } from "../../../app";
import { attendeeFactory } from "../../schema/register.schema";
import { randomUUID } from "crypto";
import { getErrorMessage } from "../../lib/vitest/helpers/getValidationError";
import { VALIDATION_ERROR_MESSAGE } from "../../../utils/error-handler";
import { eventFactory } from "../../schema/create-event.schema";
describe("Register E2E", () => {
  let event: EventEntity;
  beforeEach(async () => {
    await app.ready();
    const { event: setupEvent } = await setupTests();
    event = setupEvent;
  });

  it("should register an attendee return status 201(Created) and the created attendee", async () => {
    const attendee = attendeeFactory();
    const response = await request(app.server)
      .post(`/events/${event.id}/attendee`)
      .send(attendee);
    expect(response.status).toBe(201);
    expect(response.body.name).toBe(attendee.name);
    expect(response.body.email).toBe(attendee.email);
  });
  it("should return status 404(Not found) when event does not exist", async () => {
    const attendee = attendeeFactory();
    const response = await request(app.server)
      .post(`/events/${randomUUID()}/attendee`)
      .send(attendee);
    expect(response.status).toBe(404);
  });
  it("should return status 400(Bad request) with validation error when route-param is not an uuid", async () => {
    const attendee = attendeeFactory();
    const response = await request(app.server)
      .post(`/events/wrong-format/attendee`)
      .send(attendee);

    const errorMessage = getErrorMessage(response);
    expect(response.status).toBe(400);
    expect(errorMessage).toBe(VALIDATION_ERROR_MESSAGE);
  });
  it("should return status 400(Bad request) with validation error when body does not satisfies the schema", async () => {
    const response = await request(app.server)
      .post(`/events/wrong-format/attendee`)
      .send({});

    const errorMessage = getErrorMessage(response);
    expect(response.status).toBe(400);
    expect(errorMessage).toBe(VALIDATION_ERROR_MESSAGE);
  });

  it("should return status 403(Forbidden) registering an attendee in a event with max attendees reached", async () => {
    const attendee = attendeeFactory();
    const attendee2 = attendeeFactory();
    const createEvent = eventFactory({ maximumAttendees: 1 });
    const createdEvent = await request(app.server)
      .post(`/events`)
      .send(createEvent);
    await request(app.server)
      .post(`/events/${createdEvent.body.id}/attendee`)
      .send(attendee);
    const response = await request(app.server)
      .post(`/events/${createdEvent.body.id}/attendee`)
      .send(attendee2);
    expect(response.status).toBe(403);
  });
  it("should return status 409(Conflict) when registering an attendee in a event a already used email", async () => {
    const attendee = attendeeFactory();
    await request(app.server)
      .post(`/events/${event.id}/attendee`)
      .send(attendee);
    const response = await request(app.server)
      .post(`/events/${event.id}/attendee`)
      .send(attendee);
    expect(response.status).toBe(409);
  });
});
