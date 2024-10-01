/*
  Warnings:

  - Added the required column `is_public` to the `reminders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "reminders" ADD COLUMN     "is_public" BOOLEAN NOT NULL;
