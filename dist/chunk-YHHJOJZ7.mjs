import {
  EventDetailsUseCase
} from "./chunk-CKFHUFCH.mjs";
import {
  eventDetailsOutputSchema,
  eventDetailsParamsInputSchema
} from "./chunk-KHFNKRDU.mjs";

// src/infra/controllers/event-details.controller.ts
import { container } from "tsyringe";
var EventDetailsController = class {
  static async handle(app) {
    app.withTypeProvider().get(
      "/events/:id",
      {
        schema: {
          tags: ["Events"],
          params: eventDetailsParamsInputSchema,
          response: {
            200: eventDetailsOutputSchema
          }
        }
      },
      async (request, reply) => {
        const eventDetailsUseCase = container.resolve(EventDetailsUseCase);
        const { id } = request.params;
        const event = await eventDetailsUseCase.execute(id);
        return reply.send(event);
      }
    );
  }
};

export {
  EventDetailsController
};
