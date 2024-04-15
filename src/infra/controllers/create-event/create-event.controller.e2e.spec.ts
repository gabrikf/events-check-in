import request from "supertest";
import { describe, expect, it } from "vitest";
import { app } from "../../../server";
import {
  attendee,
  beforeEachE2E,
} from "../../lib/vitest/helpers/beforeEachE2E";
import { getErrorMessage } from "../../lib/vitest/helpers/getSupertestError";
import { VALIDATION_ERROR_MESSAGE } from "../../../error-handler";
import { eventFactory } from "../../schema/create-event.schema";

// beforeEachE2E();

describe("Create Event Controller", () => {
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
  // it("should return status 409(Conflict) when a attendee request more than one check-in", async () => {
  //   await request(app.server).get(`/attendees/${attendee.id}/check-in`);
  //   const response = await request(app.server).get(
  //     `/attendees/${attendee.id}/check-in`
  //   );
  //   expect(response.status).toBe(409);
  // });

  // it("should return status 404(Not found) when attendee does not exist", async () => {
  //   await request(app.server).get(`/attendees/${attendee.id}/check-in`);
  //   const response = await request(app.server).get(`/attendees/4/check-in`);
  //   expect(response.status).toBe(404);
  // });

  // it("should return status 400(Bad request) with validation error when route-param is not a number", async () => {
  //   const response = await request(app.server).get(
  //     `/attendees/dawdaw/check-in`
  //   );
  //   const errorMessage = getErrorMessage(response);
  //   expect(response.status).toBe(400);
  //   expect(errorMessage).toBe(VALIDATION_ERROR_MESSAGE);
  // });
});
