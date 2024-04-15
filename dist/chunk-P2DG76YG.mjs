import {
  ClientError
} from "./chunk-PVNWARHM.mjs";

// src/core/errors/forbidden.error.ts
var ForbiddenError = class extends ClientError {
  constructor(message) {
    super(message ?? "Forbidden resource", 403);
  }
};

export {
  ForbiddenError
};
