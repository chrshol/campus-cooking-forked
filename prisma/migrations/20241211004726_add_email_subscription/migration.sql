-- CreateTable
CREATE TABLE "EmailSubscription" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "subscribedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EmailSubscription_pkey" PRIMARY KEY ("id")
);
