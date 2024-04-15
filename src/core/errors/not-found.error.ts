import { ClientError } from ".";

export class NotFoundError extends ClientError {
  constructor(message?: string) {
    super(message ?? "Not found", 404);
  }
}
