import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import {
  registerBodyInputSchema,
  registerOutputSchema,
  registerParamsInputSchema,
} from "../../schema/register.schema";
import { container } from "tsyringe";
import { RegisterUseCase } from "../../../core/use-cases/register/register.use-case";

export class RegisterController {
  static async handle(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().post(
      "/events/:eventId/attendee",
      {
        schema: {
          tags: ["Events"],
          body: registerBodyInputSchema,
          params: registerParamsInputSchema,
          response: {
            201: registerOutputSchema,
          },
        },
      },
      async (request, reply) => {
        const registerUseCase = container.resolve(RegisterUseCase);
        const { name, email } = request.body;
        const { eventId } = request.params;
        const createdAttendee = await registerUseCase.execute({
          name,
          email,
          eventId,
        });
        return reply.status(201).send(createdAttendee);
      }
    );
  }
}
