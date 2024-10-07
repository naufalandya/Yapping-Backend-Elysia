-- DropForeignKey
ALTER TABLE "YappinLike" DROP CONSTRAINT "YappinLike_yappin_id_fkey";

-- AlterTable
ALTER TABLE "YappinLike" ALTER COLUMN "yappin_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "YappinLike" ADD CONSTRAINT "YappinLike_yappin_id_fkey" FOREIGN KEY ("yappin_id") REFERENCES "yappins"("id") ON DELETE SET NULL ON UPDATE CASCADE;
