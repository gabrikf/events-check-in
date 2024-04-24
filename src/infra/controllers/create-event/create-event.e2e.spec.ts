import { Event } from "@prisma/client";
import request from "supertest";
import { beforeEach, describe, expect, it } from "vitest";
import { app } from "../../../app";
import { VALIDATION_ERROR_MESSAGE } from "../../../utils/error-handler";
import { getErrorMessage } from "../../lib/vitest/helpers/getValidationError";
import { eventFactory } from "../../schema/create-event.schema";
import { eventDetailsOutputSchema } from "../../schema/event-details.schema";
import { setupTests } from "../../lib/vitest/helpers/beforeEachE2E";
import { EventEntity } from "../../../core/entities/event/event.entity";
import { AttendeeEntity } from "../../../core/entities/attendee/attendee.entity";

describe("Create Event Controller", () => {
  let event: EventEntity;
  let attendee: AttendeeEntity;

  beforeEach(async () => {
    await app.ready();
    const { event: setupEvent, attendee: setupAttendee } = await setupTests();
    event = setupEvent;
    attendee = setupAttendee;
  });

  it("should create a event passing all props returning code 201(Created)", async () => {
    const createEvent = eventFactory({ maximumAttendees: 100 });
    const response = await request(app.server)
      .post(`/events`)
      .send(createEvent);
    expect(response.status).toBe(201);
  });
  it("should create a event passing just mandatory fields returning code 201(Created)", async () => {
    const response = await request(app.server)
      .post(`/events`)
      .send({ title: "mandatory field" });
    expect(response.status).toBe(201);
  });
  it("should return status 409(Conflict) when a attendee request more than one check-in", async () => {
    await request(app.server).get(`/attendees/${attendee.id}/check-in`);
    const response = await request(app.server).get(
      `/attendees/${attendee.id}/check-in`
    );
    expect(response.status).toBe(409);
  });

  it("should return status 404(Not found) when attendee does not exist", async () => {
    const response = await request(app.server).get(`/attendees/10/check-in`);
    expect(response.status).toBe(404);
  });

  it("should return status 400(Bad request) with validation error when route-param is not a number", async () => {
    const response = await request(app.server).get(
      `/attendees/dawdaw/check-in`
    );

    const errorMessage = getErrorMessage(response);
    expect(response.status).toBe(400);
    expect(errorMessage).toBe(VALIDATION_ERROR_MESSAGE);
  });
});
