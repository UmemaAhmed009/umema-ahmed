// shared/errors/SubscriptionInactiveError.ts

import { AppError } from "./AppError";

export class SubscriptionInactiveError extends AppError {
  constructor() {
    super(
      "SUBSCRIPTION_INACTIVE",
      403,
      "Subscription is inactive."
    );
  }
}