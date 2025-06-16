/*
  Warnings:

  - A unique constraint covering the columns `[key]` on the table `Podcast` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Podcast_key_key" ON "Podcast"("key");
