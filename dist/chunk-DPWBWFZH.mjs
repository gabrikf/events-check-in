import {
  ClientError
} from "./chunk-PVNWARHM.mjs";

// src/error-handler.ts
import { ZodError } from "zod";
var errorHandler = (error, request, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: "Error during validation",
      errors: error.flatten().fieldErrors
    });
  }
  if (error instanceof ClientError) {
    return reply.status(error.statusCode).send({
      message: error.message
    });
  }
  return reply.status(500).send({ message: "Internal server error!" });
};

export {
  errorHandler
};
