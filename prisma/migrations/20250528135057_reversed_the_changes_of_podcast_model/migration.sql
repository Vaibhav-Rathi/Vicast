/*
  Warnings:

  - Added the required column `key` to the `Podcast` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Podcast" ADD COLUMN     "key" TEXT NOT NULL,
ADD CONSTRAINT "Podcast_pkey" PRIMARY KEY ("id");
