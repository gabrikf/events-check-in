import {
  CreateEventUseCase
} from "./chunk-EIXDDQM7.mjs";
import {
  createEventInputSchema,
  createEventOutputSchema
} from "./chunk-UEESOWTS.mjs";

// src/infra/controllers/create-event.controller.ts
import { container } from "tsyringe";
var CreateEventController = class {
  static async handle(app) {
    app.withTypeProvider().post(
      "/events",
      {
        schema: {
          tags: ["Events"],
          body: createEventInputSchema,
          response: {
            201: createEventOutputSchema
          }
        }
      },
      async (request, reply) => {
        const createEventUseCase = container.resolve(CreateEventUseCase);
        const event = await createEventUseCase.execute(request.body);
        return reply.status(201).send(event);
      }
    );
  }
};

export {
  CreateEventController
};
