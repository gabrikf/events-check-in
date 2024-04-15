export class ClientError extends Error {
  statusCode: number = 400;
  constructor(message: string, status: number) {
    super(message);
    if (status >= 400 && status < 500) {
      this.statusCode = status;
    }
  }
}
