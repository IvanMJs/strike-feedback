-- CreateTable
CREATE TABLE "vulnerabilities" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "severity" TEXT NOT NULL,
    "cwe" TEXT,
    "cvssScore" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "affectedSystems" TEXT NOT NULL,
    "suggestedFix" TEXT,
    "reporter" TEXT,
    "assignee" TEXT,
    "status" TEXT NOT NULL DEFAULT 'PENDING_FIX',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "vulnerabilities_pkey" PRIMARY KEY ("id")
);
