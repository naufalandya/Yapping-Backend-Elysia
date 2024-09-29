-- AlterTable
ALTER TABLE "yappins" ADD COLUMN     "location" TEXT NOT NULL DEFAULT 'Earth',
ALTER COLUMN "total_likes" SET DEFAULT 0,
ALTER COLUMN "is_public" SET DEFAULT false;
