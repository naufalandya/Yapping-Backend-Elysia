-- AlterTable
CREATE SEQUENCE yappin_image_id_seq;
ALTER TABLE "yappin_image" ALTER COLUMN "id" SET DEFAULT nextval('yappin_image_id_seq');
ALTER SEQUENCE yappin_image_id_seq OWNED BY "yappin_image"."id";
