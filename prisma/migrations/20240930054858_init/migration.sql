/*
  Warnings:

  - Added the required column `title` to the `reminders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "reminders" ADD COLUMN     "title" TEXT NOT NULL;
