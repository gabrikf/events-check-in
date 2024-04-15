import { ClientError } from ".";

export class ConflictError extends ClientError {
  constructor(message?: string) {
    super(message ?? "Conflict", 409);
  }
}
