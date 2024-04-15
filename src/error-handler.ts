import { FastifyInstance } from "fastify";
import { ZodError } from "zod";
import { ClientError } from "./core/errors";

type FastifyErrorHandler = FastifyInstance["errorHandler"];

export const VALIDATION_ERROR_MESSAGE = "Error during validation" as const;

export const errorHandler: FastifyErrorHandler = (error, request, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: VALIDATION_ERROR_MESSAGE,
      errors: error.flatten().fieldErrors,
    });
  }
  if (error instanceof ClientError) {
    return reply.status(error.statusCode).send({
      message: error.message,
    });
  }
  return reply.status(500).send({ message: "Internal server error!" });
};
