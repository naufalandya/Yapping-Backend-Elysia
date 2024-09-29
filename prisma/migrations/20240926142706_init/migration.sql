/*
  Warnings:

  - Changed the type of `is_Public` on the `yappins` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "yappins" DROP COLUMN "is_Public",
ADD COLUMN     "is_Public" BOOLEAN NOT NULL;
