import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import {
  getAllAttendeesByEventOutput,
  getAllAttendeesByEventParamsInput,
  getAllAttendeesByEventQueryInput,
} from "../schema/get-all-attendees-by-event.schema";
import { container } from "tsyringe";
import { GetAllAttendeesByEventUseCase } from "../../core/use-cases/get-all-attendees-by-event-id/get-all-attendees-by-event-id.use-case";

export class GetAllAttendeesByEventController {
  static async handle(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().get(
      "/attendees/:eventId/event",
      {
        schema: {
          tags: ["Attendees"],
          params: getAllAttendeesByEventParamsInput,
          querystring: getAllAttendeesByEventQueryInput,
          response: {
            200: getAllAttendeesByEventOutput,
          },
        },
      },
      async (request, reply) => {
        const getAllAttendeesByEventUseCase = container.resolve(
          GetAllAttendeesByEventUseCase
        );
        const result = await getAllAttendeesByEventUseCase.execute({
          eventId: request.params.eventId,
          page: request.query.page,
          limit: request.query.limit,
          searchText: request.query.query,
        });
        return reply.send(result);
      }
    );
  }
}
