-- DropForeignKey
ALTER TABLE "yappin_image" DROP CONSTRAINT "yappin_image_yappin_id_fkey";

-- AlterTable
ALTER TABLE "yappin_image" ALTER COLUMN "yappin_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "yappin_image" ADD CONSTRAINT "yappin_image_yappin_id_fkey" FOREIGN KEY ("yappin_id") REFERENCES "yappins"("id") ON DELETE SET NULL ON UPDATE CASCADE;
