/*
  Warnings:

  - You are about to drop the column `noteId` on the `Todo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Todo" DROP COLUMN "noteId",
ADD COLUMN     "isDone" BOOLEAN NOT NULL DEFAULT false;
