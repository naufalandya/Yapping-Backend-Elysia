/*
  Warnings:

  - Added the required column `total_comments` to the `yappins` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "yappins" ADD COLUMN     "total_comments" INTEGER NOT NULL;
