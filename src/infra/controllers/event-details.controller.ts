import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import {
  eventDetailsOutputSchema,
  eventDetailsParamsInputSchema,
} from "../schema/event-details.schema";
import { container } from "tsyringe";
import { EventDetailsUseCase } from "../../core/use-cases/event-details/event-details.use-case";

export class EventDetailsController {
  static async handle(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().get(
      "/events/:id",
      {
        schema: {
          tags: ["Events"],
          params: eventDetailsParamsInputSchema,
          response: {
            200: eventDetailsOutputSchema,
          },
        },
      },
      async (request, reply) => {
        const eventDetailsUseCase = container.resolve(EventDetailsUseCase);
        const { id } = request.params;
        const event = await eventDetailsUseCase.execute(id);
        return reply.send(event);
      }
    );
  }
}
