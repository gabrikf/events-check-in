import {
  ClientError
} from "./chunk-PVNWARHM.mjs";

// src/core/errors/conflict.error.ts
var ConflictError = class extends ClientError {
  constructor(message) {
    super(message ?? "Conflict", 409);
  }
};

export {
  ConflictError
};
