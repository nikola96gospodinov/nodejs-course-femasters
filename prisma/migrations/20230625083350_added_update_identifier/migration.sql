/*
  Warnings:

  - A unique constraint covering the columns `[id,belongsToId]` on the table `Update` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `belongsToId` to the `Update` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Update" ADD COLUMN     "belongsToId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Update_id_belongsToId_key" ON "Update"("id", "belongsToId");

-- AddForeignKey
ALTER TABLE "Update" ADD CONSTRAINT "Update_belongsToId_fkey" FOREIGN KEY ("belongsToId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
