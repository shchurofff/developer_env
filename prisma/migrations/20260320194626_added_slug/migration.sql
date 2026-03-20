/*
  Warnings:

  - Added the required column `slug` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Project" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "startDay" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endDay" DATETIME,
    "status" TEXT NOT NULL DEFAULT 'WORKING_NOW'
);
INSERT INTO "new_Project" ("description", "endDay", "id", "name", "startDay", "status") SELECT "description", "endDay", "id", "name", "startDay", "status" FROM "Project";
DROP TABLE "Project";
ALTER TABLE "new_Project" RENAME TO "Project";
CREATE UNIQUE INDEX "Project_slug_key" ON "Project"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
