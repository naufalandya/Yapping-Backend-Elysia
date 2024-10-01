-- AlterTable
CREATE SEQUENCE reminders_id_seq;
ALTER TABLE "reminders" ALTER COLUMN "id" SET DEFAULT nextval('reminders_id_seq');
ALTER SEQUENCE reminders_id_seq OWNED BY "reminders"."id";
