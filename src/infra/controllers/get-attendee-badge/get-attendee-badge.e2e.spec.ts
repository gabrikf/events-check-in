import { beforeEach, describe, expect, it } from "vitest";
import { AttendeeEntity } from "../../../core/entities/attendee/attendee.entity";
import { setupTests } from "../../lib/vitest/helpers/beforeEachE2E";
import { app } from "../../../app";
import request from "supertest";
import { EventEntity } from "../../../core/entities/event/event.entity";
import { isUrl } from "../../../utils/regex/is-url";
import { getErrorMessage } from "../../lib/vitest/helpers/getValidationError";
import { VALIDATION_ERROR_MESSAGE } from "../../../utils/error-handler";

describe("Get Attendee Badge E2E", () => {
  let attendee: AttendeeEntity;
  let event: EventEntity;

  beforeEach(async () => {
    await app.ready();
    const { attendee: setupAttendee, event: setupEvent } = await setupTests();
    attendee = setupAttendee;
    event = setupEvent;
  });

  it("should return attendee badge by id", async () => {
    const response = await request(app.server).get(
      `/attendees/${attendee.id}/badge`
    );

    expect(response.status).toBe(200);
    expect(response.body.name).toBe(attendee.name);
    expect(response.body.email).toBe(attendee.email);
    expect(response.body.eventTitle).toBe(event.title);
    expect(response.body.checkInUrl).toMatch(isUrl);
  });

  it("should return status 404(Not found) when attendee does not exist", async () => {
    const response = await request(app.server).get(`/attendees/5/badge`);

    expect(response.status).toBe(404);
  });

  it("should return status 400(Bad request) with validation error when route-param is not a number", async () => {
    const response = await request(app.server).get(`/attendees/aa/badge`);

    const errorMessage = getErrorMessage(response);
    expect(response.status).toBe(400);
    expect(errorMessage).toBe(VALIDATION_ERROR_MESSAGE);
  });
});
