import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import {
  getAttendeeBadgeOutputSchema,
  getAttendeeBadgeParamsSchema,
} from "../schema/get-attendee-badge.schema";
import { container } from "tsyringe";
import { GetAttendeeBadgeUseCase } from "../../core/use-cases/get-attendee-badge/get-attendee-badge.use-case";

export class GetAttendeeBadgeController {
  static async handle(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().get(
      "/attendees/:id/badge",
      {
        schema: {
          tags: ["Attendees"],
          params: getAttendeeBadgeParamsSchema,
          response: {
            200: getAttendeeBadgeOutputSchema,
          },
        },
      },
      async (request, reply) => {
        const getAttendeeBadge = container.resolve(GetAttendeeBadgeUseCase);
        const attendeeBadge = await getAttendeeBadge.execute({
          id: request.params.id,
          protocol: request.protocol,
          hostname: request.hostname,
        });
        return reply.send(attendeeBadge);
      }
    );
  }
}
