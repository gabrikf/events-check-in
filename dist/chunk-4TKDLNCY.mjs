import {
  getAttendeeBadgeOutputSchema,
  getAttendeeBadgeParamsSchema
} from "./chunk-X3L5SWQV.mjs";
import {
  GetAttendeeBadgeUseCase
} from "./chunk-RLMIHLCK.mjs";

// src/infra/controllers/get-attendee-badge.controller.ts
import { container } from "tsyringe";
var GetAttendeeBadgeController = class {
  static async handle(app) {
    app.withTypeProvider().get(
      "/attendees/:id/badge",
      {
        schema: {
          tags: ["Attendees"],
          params: getAttendeeBadgeParamsSchema,
          response: {
            200: getAttendeeBadgeOutputSchema
          }
        }
      },
      async (request, reply) => {
        const getAttendeeBadge = container.resolve(GetAttendeeBadgeUseCase);
        const attendeeBadge = await getAttendeeBadge.execute({
          id: request.params.id,
          protocol: request.protocol,
          hostname: request.hostname
        });
        return reply.send(attendeeBadge);
      }
    );
  }
};

export {
  GetAttendeeBadgeController
};
