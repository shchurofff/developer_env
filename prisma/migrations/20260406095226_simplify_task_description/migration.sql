/*
  Warnings:

  - You are about to drop the `Comment` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `description` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_taskId_fkey";

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "description" TEXT NOT NULL;

-- DropTable
DROP TABLE "Comment";
