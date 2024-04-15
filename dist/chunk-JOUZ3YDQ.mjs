import {
  RegisterUseCase
} from "./chunk-5CJZEDZG.mjs";
import {
  registerBodyInputSchema,
  registerOutputSchema,
  registerParamsInputSchema
} from "./chunk-MHZ7IGNT.mjs";

// src/infra/controllers/register.controller.ts
import { container } from "tsyringe";
var RegisterController = class {
  static async handle(app) {
    app.withTypeProvider().post(
      "/events/:eventId/attendee",
      {
        schema: {
          tags: ["Events"],
          body: registerBodyInputSchema,
          params: registerParamsInputSchema,
          response: {
            201: registerOutputSchema
          }
        }
      },
      async (request, reply) => {
        const registerUseCase = container.resolve(RegisterUseCase);
        const { name, email } = request.body;
        const { eventId } = request.params;
        const createdAttendee = await registerUseCase.execute({
          name,
          email,
          eventId
        });
        return reply.status(201).send(createdAttendee);
      }
    );
  }
};

export {
  RegisterController
};
