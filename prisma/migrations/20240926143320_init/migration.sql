/*
  Warnings:

  - You are about to drop the column `is_Public` on the `yappins` table. All the data in the column will be lost.
  - Changed the type of `is_public` on the `yappins` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "yappins" DROP COLUMN "is_Public",
DROP COLUMN "is_public",
ADD COLUMN     "is_public" BOOLEAN NOT NULL;
