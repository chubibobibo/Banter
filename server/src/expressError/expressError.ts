export class ExpressError extends Error {
  status: number; // adds the attribute status to ExpressError
  constructor(message: string, status: number) {
    super();
    this.message = message;
    this.status = status;
  }
}
