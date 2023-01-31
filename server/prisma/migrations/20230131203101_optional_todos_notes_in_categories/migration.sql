-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_noteId_fkey";

-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_todoId_fkey";

-- AlterTable
ALTER TABLE "Category" ALTER COLUMN "noteId" DROP NOT NULL,
ALTER COLUMN "todoId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_noteId_fkey" FOREIGN KEY ("noteId") REFERENCES "Note"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_todoId_fkey" FOREIGN KEY ("todoId") REFERENCES "Todo"("id") ON DELETE SET NULL ON UPDATE CASCADE;
