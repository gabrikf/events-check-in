import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { container } from "tsyringe";
import { CheckInUseCase } from "../../../core/use-cases/check-in/check-in.use-case";
import {
  checkInOutputSchema,
  checkInParamsSchema,
} from "../../schema/check-in.schema";

export class CreateCheckInController {
  static async handle(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().get(
      "/attendees/:id/check-in",
      {
        schema: {
          tags: ["Attendees"],
          params: checkInParamsSchema,
          response: {
            201: checkInOutputSchema,
          },
        },
      },

      async (request, reply) => {
        const checkInUseCase = container.resolve(CheckInUseCase);
        await checkInUseCase.execute(request.params.id);
        return reply.status(204).send();
      }
    );
  }
}
