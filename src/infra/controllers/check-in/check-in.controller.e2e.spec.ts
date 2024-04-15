import request from "supertest";
import { describe, expect, it } from "vitest";
import { app } from "../../../server";
import {
  attendee,
  beforeEachE2E,
} from "../../lib/vitest/helpers/beforeEachE2E";
import { getErrorMessage } from "../../lib/vitest/helpers/getSupertestError";
import { VALIDATION_ERROR_MESSAGE } from "../../../error-handler";

beforeEachE2E();

describe("Check-in Controller", () => {
  it("should check-in a event returning code 204(No content)", async () => {
    const response = await request(app.server).get(
      `/attendees/${attendee.id}/check-in`
    );
    expect(response.status).toBe(204);
  });

  it("should return status 409(Conflict) when a attendee request more than one check-in", async () => {
    await request(app.server).get(`/attendees/${attendee.id}/check-in`);
    const response = await request(app.server).get(
      `/attendees/${attendee.id}/check-in`
    );
    expect(response.status).toBe(409);
  });

  it("should return status 404(Not found) when attendee does not exist", async () => {
    await request(app.server).get(`/attendees/${attendee.id}/check-in`);
    const response = await request(app.server).get(`/attendees/4/check-in`);
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
