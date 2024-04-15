import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { container } from "tsyringe";
import { CreateEventUseCase } from "../../../core/use-cases/create-event/create-event.use-case";
import {
  createEventInputSchema,
  createEventOutputSchema,
} from "../../schema/create-event.schema";

export class CreateEventController {
  static async handle(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().post(
      "/events",
      {
        schema: {
          tags: ["Events"],
          body: createEventInputSchema,
          response: {
            201: createEventOutputSchema,
          },
        },
      },
      async (request, reply) => {
        const createEventUseCase = container.resolve(CreateEventUseCase);
        const event = await createEventUseCase.execute(request.body);
        return reply.status(201).send(event);
      }
    );
  }
}
