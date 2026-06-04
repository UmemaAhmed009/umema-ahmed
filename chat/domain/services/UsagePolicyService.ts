import { prisma } from "../../../shared/database/prisma";
import { QuotaExceededError } from "../../../shared/errors/QuotaExceededError";

export class UsagePolicyService {
  async validateUsage(userId: string): Promise<void> {
    const now = new Date();

    const month = now.getMonth() + 1;
    const year = now.getFullYear();

    let usage = await prisma.monthlyUsage.findUnique({
      where: {
        userId_month_year: {
          userId,
          month,
          year,
        },
      },
    });

    if (!usage) {
      usage = await prisma.monthlyUsage.create({
        data: {
          userId,
          month,
          year,
          freeMessagesUsed: 0,
        },
      });
    }

    // Free quota available
    if (usage.freeMessagesUsed < 3) {
      await prisma.monthlyUsage.update({
        where: {
          id: usage.id,
        },
        data: {
          freeMessagesUsed: {
            increment: 1,
          },
        },
      });

      return;
    }

    // Check active subscription
    const subscription = await prisma.subscription.findFirst({
      where: {
        userId,
        active: true,
      },
    });

    if (!subscription) {
      throw new QuotaExceededError();
    }

    // Enterprise = unlimited
    if (subscription.maxMessages === null) {
      return;
    }

    // Quota exhausted
    if (subscription.usedMessages >= subscription.maxMessages) {
      throw new QuotaExceededError();
    }

    // Consume subscription quota
    await prisma.subscription.update({
      where: {
        id: subscription.id,
      },
      data: {
        usedMessages: {
          increment: 1,
        },
      },
    });
  }
}