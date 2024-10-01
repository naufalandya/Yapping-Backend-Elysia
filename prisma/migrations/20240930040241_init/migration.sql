/*
  Warnings:

  - Added the required column `total_engage_four` to the `preference_yappin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_engage_one` to the `preference_yappin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_engage_three` to the `preference_yappin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_engage_two` to the `preference_yappin` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "preference_yappin" ADD COLUMN     "total_engage_four" INTEGER NOT NULL,
ADD COLUMN     "total_engage_one" INTEGER NOT NULL,
ADD COLUMN     "total_engage_three" INTEGER NOT NULL,
ADD COLUMN     "total_engage_two" INTEGER NOT NULL,
ALTER COLUMN "preference_tag_one" SET DATA TYPE TEXT,
ALTER COLUMN "preference_tag_two" SET DATA TYPE TEXT,
ALTER COLUMN "preference_tag_three" SET DATA TYPE TEXT,
ALTER COLUMN "preference_tag_four" SET DATA TYPE TEXT;

-- CreateTable
CREATE TABLE "list_preference" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "list_preference_pkey" PRIMARY KEY ("id")
);
