import "reflect-metadata";
import fastify from "fastify";
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";
import "./infra/container";

import { RegisterController } from "./infra/controllers/register/register.controller";
import { CreateEventController } from "./infra/controllers/create-event/create-event.controller";
import { EventDetailsController } from "./infra/controllers/event-details/event-details.controller";
import { GetAttendeeBadgeController } from "./infra/controllers/get-attendee-badge/get-attendee-badge.controller";
import { CreateCheckInController } from "./infra/controllers/check-in/check-in.controller";
import { GetAllAttendeesByEventController } from "./infra/controllers/get-all-attendees-by-event/get-all-attendees-by-event.controller";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import { errorHandler } from "./utils/error-handler";
import fastifyCors from "@fastify/cors";
const app = fastify();

app.register(fastifyCors, {
  origin: "*",
});

app.register(fastifySwagger, {
  swagger: {
    consumes: ["application/json"],
    produces: ["application/json"],
    info: {
      title: "pass-in",
      version: "1.0.0",
      description:
        "This is the api documentation for pass-in, an check-in method for events",
    },
  },
  transform: jsonSchemaTransform,
});

app.register(fastifySwaggerUi, {
  routePrefix: "/docs",
});

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(CreateEventController.handle);
app.register(RegisterController.handle);
app.register(EventDetailsController.handle);
app.register(GetAttendeeBadgeController.handle);
app.register(CreateCheckInController.handle);
app.register(GetAllAttendeesByEventController.handle);

app.setErrorHandler(errorHandler);

export { app };
