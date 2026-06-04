export enum BundleTier {
  BASIC = "BASIC",
  PRO = "PRO",
  ENTERPRISE = "ENTERPRISE"
}

export class SubscriptionBundle {
  constructor(
    public id: string,
    public tier: BundleTier,
    public maxMessages: number | null,
    public usedMessages: number,
    public price: number,
    public billingCycle: "MONTHLY" | "YEARLY",
    public autoRenew: boolean,
    public active: boolean,
    public startDate: Date,
    public endDate: Date,
    public renewalDate: Date
  ) {}
  remainingQuota(): number | null {
    if (this.maxMessages === null) {
      return null;
    }
    return this.maxMessages - this.usedMessages;
  }
}