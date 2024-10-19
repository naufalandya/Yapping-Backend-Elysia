import { pgTable, serial, text, uniqueIndex, integer, foreignKey, timestamp, bigint, boolean, varchar, pgEnum } from "drizzle-orm/pg-core"
  import { sql } from "drizzle-orm"

export const extension = pgEnum("EXTENSION", ['VIDEO', 'IMAGE'])
export const role = pgEnum("ROLE", ['ADMIN', 'USER'])



export const listPreference = pgTable("list_preference", {
	id: serial().primaryKey().notNull(),
	name: text().notNull(),
});

export const tags = pgTable("tags", {
	id: serial().primaryKey().notNull(),
	name: integer().notNull(),
},
(table) => {
	return {
		nameKey: uniqueIndex("tags_name_key").using("btree", table.name.asc().nullsLast()),
	}
});

export const commentNotifications = pgTable("comment_notifications", {
	id: serial().primaryKey().notNull(),
	detail: text().notNull(),
	redirect: text(),
	createdAt: timestamp("created_at", { precision: 3, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	userId: integer("user_id").notNull(),
	yappinCommentId: integer("yappin_comment_id").notNull(),
	byId: integer("by_id").notNull(),
},
(table) => {
	return {
		commentNotificationsByIdFkey: foreignKey({
			columns: [table.byId],
			foreignColumns: [users.id],
			name: "comment_notifications_by_id_fkey"
		}).onUpdate("cascade").onDelete("restrict"),
		commentNotificationsUserIdFkey: foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "comment_notifications_user_id_fkey"
		}).onUpdate("cascade").onDelete("restrict"),
		commentNotificationsYappinCommentIdFkey: foreignKey({
			columns: [table.yappinCommentId],
			foreignColumns: [yappinComment.id],
			name: "comment_notifications_yappin_comment_id_fkey"
		}).onUpdate("cascade").onDelete("restrict"),
	}
});

export const yappinComment = pgTable("YappinComment", {
	id: serial().primaryKey().notNull(),
	content: text().notNull(),
	createdAt: timestamp("created_at", { precision: 3, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	userId: integer("user_id").notNull(),
	yappinId: integer("yappin_id").notNull(),
},
(table) => {
	return {
		yappinCommentUserIdFkey: foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "YappinComment_user_id_fkey"
		}).onUpdate("cascade").onDelete("restrict"),
		yappinCommentYappinIdFkey: foreignKey({
			columns: [table.yappinId],
			foreignColumns: [yappins.id],
			name: "YappinComment_yappin_id_fkey"
		}).onUpdate("cascade").onDelete("restrict"),
	}
});

// export const sqlxMigrations = pgTable("_sqlx_migrations", {
// 	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
// 	version: bigint({ mode: "number" }).primaryKey().notNull(),
// 	description: text().notNull(),
// 	installedOn: timestamp("installed_on", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
// 	success: boolean().notNull(),
// 	// TODO: failed to parse database type 'bytea'
// 	checksum: unknown("checksum").notNull(),
// 	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
// 	executionTime: bigint("execution_time", { mode: "number" }).notNull(),
// });

export const preferenceYappin = pgTable("preference_yappin", {
	id: serial().primaryKey().notNull(),
	preferenceTagOne: text("preference_tag_one"),
	preferenceTagTwo: text("preference_tag_two"),
	preferenceTagThree: text("preference_tag_three"),
	preferenceTagFour: text("preference_tag_four"),
	userId: integer("user_id").notNull(),
	totalEngageFour: integer("total_engage_four"),
	totalEngageOne: integer("total_engage_one"),
	totalEngageThree: integer("total_engage_three"),
	totalEngageTwo: integer("total_engage_two"),
},
(table) => {
	return {
		userIdKey: uniqueIndex("preference_yappin_user_id_key").using("btree", table.userId.asc().nullsLast()),
		preferenceYappinUserIdFkey: foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "preference_yappin_user_id_fkey"
		}).onUpdate("cascade").onDelete("restrict"),
	}
});

export const prismaMigrations = pgTable("_prisma_migrations", {
	id: varchar({ length: 36 }).primaryKey().notNull(),
	checksum: varchar({ length: 64 }).notNull(),
	finishedAt: timestamp("finished_at", { withTimezone: true, mode: 'string' }),
	migrationName: varchar("migration_name", { length: 255 }).notNull(),
	logs: text(),
	rolledBackAt: timestamp("rolled_back_at", { withTimezone: true, mode: 'string' }),
	startedAt: timestamp("started_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	appliedStepsCount: integer("applied_steps_count").default(0).notNull(),
});

export const users = pgTable("users", {
	id: serial().primaryKey().notNull(),
	name: varchar({ length: 100 }),
	username: varchar({ length: 50 }).notNull(),
	email: varchar({ length: 50 }).notNull(),
	password: varchar({ length: 120 }).notNull(),
	country: varchar({ length: 50 }),
	city: varchar({ length: 50 }),
	bio: varchar({ length: 255 }),
	avatarLink: text("avatar_link"),
	googleId: text(),
	createdAt: timestamp("created_at", { precision: 3, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedAt: timestamp("updated_at", { precision: 3, mode: 'string' }).notNull(),
	role: role().default('USER').notNull(),
},
(table) => {
	return {
		emailKey: uniqueIndex("users_email_key").using("btree", table.email.asc().nullsLast()),
		usernameKey: uniqueIndex("users_username_key").using("btree", table.username.asc().nullsLast()),
	}
});

export const yappinImage = pgTable("yappin_image", {
	id: serial().primaryKey().notNull(),
	imageLink: text("image_link").notNull(),
	yappinId: integer("yappin_id"),
	type: extension().notNull(),
},
(table) => {
	return {
		yappinImageYappinIdFkey: foreignKey({
			columns: [table.yappinId],
			foreignColumns: [yappins.id],
			name: "yappin_image_yappin_id_fkey"
		}).onUpdate("cascade").onDelete("set null"),
	}
});

export const yappins = pgTable("yappins", {
	id: serial().primaryKey().notNull(),
	caption: text().notNull(),
	totalLikes: integer("total_likes").default(0),
	createdAt: timestamp("created_at", { precision: 3, mode: 'string' }).notNull(),
	tagOneId: integer("tag_one_id"),
	tagTwoId: integer("tag_two_id"),
	tagThreeId: integer("tag_three_id"),
	tagFourId: integer("tag_four_id"),
	userId: integer("user_id").notNull(),
	tagFourName: text("tag_four_name"),
	tagOneName: text("tag_one_name"),
	tagThreeName: text("tag_three_name"),
	tagTwoName: text("tag_two_name"),
	isPublic: boolean("is_public").default(false).notNull(),
	totalComments: integer("total_comments"),
	location: text(),
},
(table) => {
	return {
		yappinsUserIdFkey: foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "yappins_user_id_fkey"
		}).onUpdate("cascade").onDelete("restrict"),
	}
});

export const yappinLike = pgTable("YappinLike", {
	id: serial().primaryKey().notNull(),
	userId: integer("user_id").notNull(),
	yappinId: integer("yappin_id"),
},
(table) => {
	return {
		userIdYappinIdKey: uniqueIndex("YappinLike_user_id_yappin_id_key").using("btree", table.userId.asc().nullsLast(), table.yappinId.asc().nullsLast()),
		yappinLikeUserIdFkey: foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "YappinLike_user_id_fkey"
		}).onUpdate("cascade").onDelete("restrict"),
		yappinLikeYappinIdFkey: foreignKey({
			columns: [table.yappinId],
			foreignColumns: [yappins.id],
			name: "YappinLike_yappin_id_fkey"
		}).onUpdate("cascade").onDelete("set null"),
	}
});

export const follows = pgTable("follows", {
	followerId: integer().notNull(),
	followingId: integer().notNull(),
	createdAt: timestamp({ precision: 3, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	id: serial().primaryKey().notNull(),
},
(table) => {
	return {
		followerIdFollowingIdKey: uniqueIndex("follows_followerId_followingId_key").using("btree", table.followerId.asc().nullsLast(), table.followingId.asc().nullsLast()),
		followsFollowerIdFkey: foreignKey({
			columns: [table.followerId],
			foreignColumns: [users.id],
			name: "follows_followerId_fkey"
		}).onUpdate("cascade").onDelete("restrict"),
		followsFollowingIdFkey: foreignKey({
			columns: [table.followingId],
			foreignColumns: [users.id],
			name: "follows_followingId_fkey"
		}).onUpdate("cascade").onDelete("restrict"),
	}
});

export const likeNotifications = pgTable("like_notifications", {
	id: serial().primaryKey().notNull(),
	detail: text().notNull(),
	redirect: text(),
	createdAt: timestamp("created_at", { precision: 3, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	userId: integer("user_id").notNull(),
	yappinLikeId: integer("yappin_like_id").notNull(),
	byId: integer("by_id").notNull(),
},
(table) => {
	return {
		likeNotificationsByIdFkey: foreignKey({
			columns: [table.byId],
			foreignColumns: [users.id],
			name: "like_notifications_by_id_fkey"
		}).onUpdate("cascade").onDelete("restrict"),
		likeNotificationsUserIdFkey: foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "like_notifications_user_id_fkey"
		}).onUpdate("cascade").onDelete("restrict"),
		likeNotificationsYappinLikeIdFkey: foreignKey({
			columns: [table.yappinLikeId],
			foreignColumns: [yappinLike.id],
			name: "like_notifications_yappin_like_id_fkey"
		}).onUpdate("cascade").onDelete("restrict"),
	}
});

export const reminders = pgTable("reminders", {
	id: serial().primaryKey().notNull(),
	content: text().notNull(),
	isFinished: boolean("is_finished").default(false).notNull(),
	startedDate: timestamp("started_date", { precision: 3, mode: 'string' }).notNull(),
	finishedDate: timestamp("finished_date", { precision: 3, mode: 'string' }),
	deadlineDate: timestamp("deadline_date", { precision: 3, mode: 'string' }).notNull(),
	createdDate: timestamp("created_date", { precision: 3, mode: 'string' }).notNull(),
	userId: integer("user_id").notNull(),
	isPublic: boolean("is_public").notNull(),
	location: text().notNull(),
	title: text().notNull(),
},
(table) => {
	return {
		remindersUserIdFkey: foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "reminders_user_id_fkey"
		}).onUpdate("cascade").onDelete("restrict"),
	}
});