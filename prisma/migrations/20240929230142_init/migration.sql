/*
  Warnings:

  - Added the required column `type` to the `yappin_image` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "EXTENSION" AS ENUM ('VIDEO', 'IMAGE');

-- AlterTable
ALTER TABLE "yappin_image" ADD COLUMN     "type" "EXTENSION" NOT NULL;
