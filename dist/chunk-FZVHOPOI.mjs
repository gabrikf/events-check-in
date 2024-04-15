import {
  ClientError
} from "./chunk-PVNWARHM.mjs";

// src/core/errors/not-found.error.ts
var NotFoundError = class extends ClientError {
  constructor(message) {
    super(message ?? "Not found", 404);
  }
};

export {
  NotFoundError
};
