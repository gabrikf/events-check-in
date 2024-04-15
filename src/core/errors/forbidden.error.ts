import { ClientError } from ".";

export class ForbiddenError extends ClientError {
  constructor(message?: string) {
    super(message ?? "Forbidden resource", 403);
  }
}
