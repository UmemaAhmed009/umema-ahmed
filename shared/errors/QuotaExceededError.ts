import { AppError } from "./AppError";

export class QuotaExceededError
extends AppError {

  constructor() {
    super(
      "QUOTA_EXCEEDED",
      403,
      "No quota remaining"
    );
  }
}