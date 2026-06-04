import { SubscriptionBundle } from "../entities/SubscriptionBundle";

export interface ISubscriptionRepository {

  create(
    subscription: SubscriptionBundle
  ): Promise<void>;

  findActiveByUser(
    userId: string
  ): Promise<SubscriptionBundle | null>;

  update(
    subscription: SubscriptionBundle
  ): Promise<void>;
}