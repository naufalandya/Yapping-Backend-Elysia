-- CreateEnum
CREATE TYPE "ROLE" AS ENUM ('ADMIN', 'USER');

-- CreateTable
CREATE TABLE "YappinLike" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "yappin_id" INTEGER NOT NULL,

    CONSTRAINT "YappinLike_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "follows" (
    "followerId" INTEGER NOT NULL,
    "followingId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id" SERIAL NOT NULL,

    CONSTRAINT "follows_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "galleries" (
    "id" SERIAL NOT NULL,
    "image_link" TEXT[],
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "galleries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "preference_yappin" (
    "id" SERIAL NOT NULL,
    "preference_tag_one" INTEGER NOT NULL,
    "preference_tag_two" INTEGER NOT NULL,
    "preference_tag_three" INTEGER NOT NULL,
    "preference_tag_four" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "preference_yappin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reminders" (
    "id" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "is_finished" BOOLEAN NOT NULL DEFAULT false,
    "started_date" TIMESTAMP(3) NOT NULL,
    "finished_date" TIMESTAMP(3) NOT NULL,
    "deadline_date" TIMESTAMP(3) NOT NULL,
    "created_date" TIMESTAMP(3) NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "reminders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tags" (
    "id" SERIAL NOT NULL,
    "name" INTEGER NOT NULL,

    CONSTRAINT "tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "todos" (
    "id" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "is_finished" BOOLEAN NOT NULL DEFAULT false,
    "created_date" TIMESTAMP(3) NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "todos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100),
    "username" VARCHAR(50) NOT NULL,
    "email" VARCHAR(50) NOT NULL,
    "password" VARCHAR(120) NOT NULL,
    "country" VARCHAR(50),
    "city" VARCHAR(50),
    "bio" VARCHAR(255),
    "avatar_link" TEXT,
    "googleId" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "role" "ROLE" NOT NULL DEFAULT 'USER',

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "yappin_image" (
    "id" INTEGER NOT NULL,
    "image_link" TEXT NOT NULL,
    "yappin_id" INTEGER NOT NULL,

    CONSTRAINT "yappin_image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "yappins" (
    "id" SERIAL NOT NULL,
    "caption" TEXT NOT NULL,
    "total_likes" INTEGER NOT NULL,
    "is_Public" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "is_public" TEXT NOT NULL,
    "tag_one_id" INTEGER NOT NULL,
    "tag_two_id" INTEGER NOT NULL,
    "tag_three_id" INTEGER NOT NULL,
    "tag_four_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "yappins_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "YappinLike_user_id_yappin_id_key" ON "YappinLike"("user_id", "yappin_id");

-- CreateIndex
CREATE UNIQUE INDEX "follows_followerId_followingId_key" ON "follows"("followerId", "followingId");

-- CreateIndex
CREATE UNIQUE INDEX "preference_yappin_user_id_key" ON "preference_yappin"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "tags_name_key" ON "tags"("name");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "YappinLike" ADD CONSTRAINT "YappinLike_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "YappinLike" ADD CONSTRAINT "YappinLike_yappin_id_fkey" FOREIGN KEY ("yappin_id") REFERENCES "yappins"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "follows" ADD CONSTRAINT "follows_followerId_fkey" FOREIGN KEY ("followerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "follows" ADD CONSTRAINT "follows_followingId_fkey" FOREIGN KEY ("followingId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "galleries" ADD CONSTRAINT "galleries_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "preference_yappin" ADD CONSTRAINT "preference_yappin_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reminders" ADD CONSTRAINT "reminders_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "todos" ADD CONSTRAINT "todos_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "yappin_image" ADD CONSTRAINT "yappin_image_yappin_id_fkey" FOREIGN KEY ("yappin_id") REFERENCES "yappins"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "yappins" ADD CONSTRAINT "yappins_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
