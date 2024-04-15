import {
  checkInOutputSchema,
  checkInParamsSchema
} from "./chunk-XQA2A52N.mjs";
import {
  CheckInUseCase
} from "./chunk-LO7MF3JC.mjs";

// src/infra/controllers/check-in.controller.ts
import { container } from "tsyringe";
var CreateCheckInController = class {
  static async handle(app) {
    app.withTypeProvider().get(
      "/attendees/:id/check-in",
      {
        schema: {
          tags: ["Attendees"],
          params: checkInParamsSchema,
          response: {
            201: checkInOutputSchema
          }
        }
      },
      async (request, reply) => {
        const checkInUseCase = container.resolve(CheckInUseCase);
        await checkInUseCase.execute(request.params.id);
        return reply.status(201).send();
      }
    );
  }
};

export {
  CreateCheckInController
};
