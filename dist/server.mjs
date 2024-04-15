import {
  RegisterController
} from "./chunk-JOUZ3YDQ.mjs";
import "./chunk-5CJZEDZG.mjs";
import "./chunk-P2DG76YG.mjs";
import "./chunk-SIJYZJFC.mjs";
import "./chunk-YVMHEHHB.mjs";
import "./chunk-TACC3ZBO.mjs";
import "./chunk-MHZ7IGNT.mjs";
import {
  CreateCheckInController
} from "./chunk-BPQJPA6D.mjs";
import "./chunk-TLDE2PDQ.mjs";
import {
  CreateEventController
} from "./chunk-64CLVPYB.mjs";
import "./chunk-EIXDDQM7.mjs";
import "./chunk-GDUBMOYN.mjs";
import "./chunk-KJ3BH632.mjs";
import {
  EventDetailsController
} from "./chunk-YHHJOJZ7.mjs";
import "./chunk-CKFHUFCH.mjs";
import {
  GetAllAttendeesByEventController
} from "./chunk-EJPUTAAC.mjs";
import "./chunk-CEWQRBKC.mjs";
import "./chunk-QRMOPZXB.mjs";
import "./chunk-MYDWMUJR.mjs";
import {
  GetAttendeeBadgeController
} from "./chunk-3SABL6YP.mjs";
import "./chunk-ASH4RVSH.mjs";
import "./chunk-UNPCKMWJ.mjs";
import "./chunk-X3L5SWQV.mjs";
import "./chunk-FZVHOPOI.mjs";
import "./chunk-GXESN7LF.mjs";
import {
  errorHandler
} from "./chunk-DPWBWFZH.mjs";
import "./chunk-PVNWARHM.mjs";
import "./chunk-5KVUHJLJ.mjs";
import "./chunk-ZVPOZV3J.mjs";
import "./chunk-GZTCSPNV.mjs";
import "./chunk-HQS6OF3G.mjs";
import "./chunk-VVS4RKOE.mjs";
import "./chunk-GFW5S5BU.mjs";
import "./chunk-PKF4URSN.mjs";
import "./chunk-XW43K6FP.mjs";
import "./chunk-XQA2A52N.mjs";
import "./chunk-UEESOWTS.mjs";
import "./chunk-KHFNKRDU.mjs";
import "./chunk-WZGJBVCM.mjs";

// src/server.ts
import "reflect-metadata";
import fastify from "fastify";
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler
} from "fastify-type-provider-zod";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
var app = fastify();
app.register(fastifySwagger, {
  swagger: {
    consumes: ["application/json"],
    produces: ["application/json"],
    info: {
      title: "pass-in",
      version: "1.0.0",
      description: "This is the api documentation for pass-in, an check-in method for events"
    }
  },
  transform: jsonSchemaTransform
});
app.register(fastifySwaggerUi, {
  routePrefix: "/docs"
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
app.listen({ port: 3333, host: "0.0.0.0" }).then(() => {
  console.log("server running on port 3333");
});
