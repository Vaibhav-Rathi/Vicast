/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Podcast` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Podcast_userId_key" ON "Podcast"("userId");
