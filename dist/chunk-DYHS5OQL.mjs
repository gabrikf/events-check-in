import {
  getAllAttendeesByEventOutput,
  getAllAttendeesByEventParamsInput,
  getAllAttendeesByEventQueryInput
} from "./chunk-MYDWMUJR.mjs";
import {
  GetAllAttendeesByEventUseCase
} from "./chunk-CEWQRBKC.mjs";

// src/infra/controllers/get-all-attendees-by-event.controller.ts
import { container } from "tsyringe";
var GetAllAttendeesByEventController = class {
  static async handle(app) {
    app.withTypeProvider().get(
      "/attendees/:eventId/event",
      {
        schema: {
          tags: ["Attendees"],
          params: getAllAttendeesByEventParamsInput,
          querystring: getAllAttendeesByEventQueryInput,
          response: {
            200: getAllAttendeesByEventOutput
          }
        }
      },
      async (request, reply) => {
        const getAllAttendeesByEventUseCase = container.resolve(
          GetAllAttendeesByEventUseCase
        );
        const result = await getAllAttendeesByEventUseCase.execute({
          eventId: request.params.eventId,
          page: request.query.page,
          limit: request.query.limit,
          searchText: request.query.query
        });
        return reply.send(result);
      }
    );
  }
};

export {
  GetAllAttendeesByEventController
};
