import { prisma } from "./prisma";

export async function logAction(
  action: string,
  userId?: string,
  metadata?: Record<string, unknown>
) {
  await prisma.auditLog.create({
    data: {
      action,
      userId,
      metadata: metadata ? JSON.stringify(metadata) : null,
    },
  });
}
