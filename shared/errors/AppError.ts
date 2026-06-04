export class AppError extends Error {
  constructor(
    public readonly code: string,
    public readonly statusCode: number,
    message: string
  ) {
    super(message);

    this.name = this.constructor.name;

    if ("captureStackTrace" in Error) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (Error as any).captureStackTrace(this, this.constructor);
}
  }
}