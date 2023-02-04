/*
  Warnings:

  - You are about to drop the column `noteId` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `todoId` on the `Category` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_noteId_fkey";

-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_todoId_fkey";

-- DropIndex
DROP INDEX "Category_noteId_key";

-- DropIndex
DROP INDEX "Category_todoId_key";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "noteId",
DROP COLUMN "todoId";

-- AlterTable
ALTER TABLE "Note" ADD COLUMN     "categoryId" INTEGER;

-- AlterTable
ALTER TABLE "Todo" ADD COLUMN     "categoryId" INTEGER;

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Todo" ADD CONSTRAINT "Todo_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;
