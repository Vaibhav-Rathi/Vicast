/*
  Warnings:

  - You are about to drop the column `createdBy` on the `Schedule` table. All the data in the column will be lost.
  - Changed the type of `createdById` on the `Schedule` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Schedule" DROP COLUMN "createdBy",
DROP COLUMN "createdById",
ADD COLUMN     "createdById" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
