/*
  Warnings:

  - The primary key for the `Podcast` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `key` on the `Podcast` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Podcast" DROP CONSTRAINT "Podcast_pkey",
DROP COLUMN "key";
