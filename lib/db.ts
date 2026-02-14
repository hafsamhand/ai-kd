import { PrismaClient } from '@prisma/client';

declare global {
	var prisma: PrismaClient | undefined;
}

const prisma = global.prisma ??  new PrismaClient({
    // This is the new, required way to provide the connection string
    log: ['query'], // Optional: helpful for debugging
  });

if (process.env.NODE_ENV !== 'production') global.prisma = prisma;

export default prisma;
