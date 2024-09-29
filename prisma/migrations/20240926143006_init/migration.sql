/*
  Warnings:

  - Added the required column `tag_four_name` to the `yappins` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tag_one_name` to the `yappins` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tag_three_name` to the `yappins` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tag_two_name` to the `yappins` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "yappins" ADD COLUMN     "tag_four_name" TEXT NOT NULL,
ADD COLUMN     "tag_one_name" TEXT NOT NULL,
ADD COLUMN     "tag_three_name" TEXT NOT NULL,
ADD COLUMN     "tag_two_name" TEXT NOT NULL;
