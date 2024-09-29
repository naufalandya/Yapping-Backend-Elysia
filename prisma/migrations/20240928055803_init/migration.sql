/*
  Warnings:

  - You are about to drop the `galleries` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `todos` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "galleries" DROP CONSTRAINT "galleries_user_id_fkey";

-- DropForeignKey
ALTER TABLE "todos" DROP CONSTRAINT "todos_user_id_fkey";

-- DropTable
DROP TABLE "galleries";

-- DropTable
DROP TABLE "todos";
