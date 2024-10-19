-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
DO $$ BEGIN
 CREATE TYPE "public"."EXTENSION" AS ENUM('VIDEO', 'IMAGE');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."ROLE" AS ENUM('ADMIN', 'USER');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "list_preference" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tags" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "comment_notifications" (
	"id" serial PRIMARY KEY NOT NULL,
	"detail" text NOT NULL,
	"redirect" text,
	"created_at" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"user_id" integer NOT NULL,
	"yappin_comment_id" integer NOT NULL,
	"by_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "YappinComment" (
	"id" serial PRIMARY KEY NOT NULL,
	"content" text NOT NULL,
	"created_at" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"user_id" integer NOT NULL,
	"yappin_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "_sqlx_migrations" (
	"version" bigint PRIMARY KEY NOT NULL,
	"description" text NOT NULL,
	"installed_on" timestamp with time zone DEFAULT now() NOT NULL,
	"success" boolean NOT NULL,
	"checksum" "bytea" NOT NULL,
	"execution_time" bigint NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "preference_yappin" (
	"id" serial PRIMARY KEY NOT NULL,
	"preference_tag_one" text,
	"preference_tag_two" text,
	"preference_tag_three" text,
	"preference_tag_four" text,
	"user_id" integer NOT NULL,
	"total_engage_four" integer,
	"total_engage_one" integer,
	"total_engage_three" integer,
	"total_engage_two" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "_prisma_migrations" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"checksum" varchar(64) NOT NULL,
	"finished_at" timestamp with time zone,
	"migration_name" varchar(255) NOT NULL,
	"logs" text,
	"rolled_back_at" timestamp with time zone,
	"started_at" timestamp with time zone DEFAULT now() NOT NULL,
	"applied_steps_count" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100),
	"username" varchar(50) NOT NULL,
	"email" varchar(50) NOT NULL,
	"password" varchar(120) NOT NULL,
	"country" varchar(50),
	"city" varchar(50),
	"bio" varchar(255),
	"avatar_link" text,
	"googleId" text,
	"created_at" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp(3) NOT NULL,
	"role" "ROLE" DEFAULT 'USER' NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "yappin_image" (
	"id" serial PRIMARY KEY NOT NULL,
	"image_link" text NOT NULL,
	"yappin_id" integer,
	"type" "EXTENSION" NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "yappins" (
	"id" serial PRIMARY KEY NOT NULL,
	"caption" text NOT NULL,
	"total_likes" integer DEFAULT 0,
	"created_at" timestamp(3) NOT NULL,
	"tag_one_id" integer,
	"tag_two_id" integer,
	"tag_three_id" integer,
	"tag_four_id" integer,
	"user_id" integer NOT NULL,
	"tag_four_name" text,
	"tag_one_name" text,
	"tag_three_name" text,
	"tag_two_name" text,
	"is_public" boolean DEFAULT false NOT NULL,
	"total_comments" integer,
	"location" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "YappinLike" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"yappin_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "follows" (
	"followerId" integer NOT NULL,
	"followingId" integer NOT NULL,
	"createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"id" serial PRIMARY KEY NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "like_notifications" (
	"id" serial PRIMARY KEY NOT NULL,
	"detail" text NOT NULL,
	"redirect" text,
	"created_at" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"user_id" integer NOT NULL,
	"yappin_like_id" integer NOT NULL,
	"by_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "reminders" (
	"id" serial PRIMARY KEY NOT NULL,
	"content" text NOT NULL,
	"is_finished" boolean DEFAULT false NOT NULL,
	"started_date" timestamp(3) NOT NULL,
	"finished_date" timestamp(3),
	"deadline_date" timestamp(3) NOT NULL,
	"created_date" timestamp(3) NOT NULL,
	"user_id" integer NOT NULL,
	"is_public" boolean NOT NULL,
	"location" text NOT NULL,
	"title" text NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "comment_notifications" ADD CONSTRAINT "comment_notifications_by_id_fkey" FOREIGN KEY ("by_id") REFERENCES "public"."users"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "comment_notifications" ADD CONSTRAINT "comment_notifications_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "comment_notifications" ADD CONSTRAINT "comment_notifications_yappin_comment_id_fkey" FOREIGN KEY ("yappin_comment_id") REFERENCES "public"."YappinComment"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "YappinComment" ADD CONSTRAINT "YappinComment_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "YappinComment" ADD CONSTRAINT "YappinComment_yappin_id_fkey" FOREIGN KEY ("yappin_id") REFERENCES "public"."yappins"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "preference_yappin" ADD CONSTRAINT "preference_yappin_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "yappin_image" ADD CONSTRAINT "yappin_image_yappin_id_fkey" FOREIGN KEY ("yappin_id") REFERENCES "public"."yappins"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "yappins" ADD CONSTRAINT "yappins_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "YappinLike" ADD CONSTRAINT "YappinLike_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "YappinLike" ADD CONSTRAINT "YappinLike_yappin_id_fkey" FOREIGN KEY ("yappin_id") REFERENCES "public"."yappins"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "follows" ADD CONSTRAINT "follows_followerId_fkey" FOREIGN KEY ("followerId") REFERENCES "public"."users"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "follows" ADD CONSTRAINT "follows_followingId_fkey" FOREIGN KEY ("followingId") REFERENCES "public"."users"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "like_notifications" ADD CONSTRAINT "like_notifications_by_id_fkey" FOREIGN KEY ("by_id") REFERENCES "public"."users"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "like_notifications" ADD CONSTRAINT "like_notifications_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "like_notifications" ADD CONSTRAINT "like_notifications_yappin_like_id_fkey" FOREIGN KEY ("yappin_like_id") REFERENCES "public"."YappinLike"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "reminders" ADD CONSTRAINT "reminders_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "tags_name_key" ON "tags" USING btree ("name");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "preference_yappin_user_id_key" ON "preference_yappin" USING btree ("user_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "users_email_key" ON "users" USING btree ("email");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "users_username_key" ON "users" USING btree ("username");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "YappinLike_user_id_yappin_id_key" ON "YappinLike" USING btree ("user_id","yappin_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "follows_followerId_followingId_key" ON "follows" USING btree ("followerId","followingId");
*/