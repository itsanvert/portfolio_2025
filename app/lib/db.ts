// app/lib/db.ts
import { PrismaClient } from "@prisma/client";

// Declare globalThis to avoid TypeScript errors in development
declare global {
  var prisma: PrismaClient | undefined;
}

// Initialize Prisma Client as a singleton
const prisma = globalThis.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = prisma;
}

export default prisma;
