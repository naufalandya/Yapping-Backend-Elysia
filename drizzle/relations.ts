import { relations } from "drizzle-orm/relations";
import { users, commentNotifications, yappinComment, yappins, preferenceYappin, yappinImage, yappinLike, follows, likeNotifications, reminders } from "./schema";

export const commentNotificationsRelations = relations(commentNotifications, ({one}) => ({
	user_byId: one(users, {
		fields: [commentNotifications.byId],
		references: [users.id],
		relationName: "commentNotifications_byId_users_id"
	}),
	user_userId: one(users, {
		fields: [commentNotifications.userId],
		references: [users.id],
		relationName: "commentNotifications_userId_users_id"
	}),
	yappinComment: one(yappinComment, {
		fields: [commentNotifications.yappinCommentId],
		references: [yappinComment.id]
	}),
}));

export const usersRelations = relations(users, ({many}) => ({
	commentNotifications_byId: many(commentNotifications, {
		relationName: "commentNotifications_byId_users_id"
	}),
	commentNotifications_userId: many(commentNotifications, {
		relationName: "commentNotifications_userId_users_id"
	}),
	yappinComments: many(yappinComment),
	preferenceYappins: many(preferenceYappin),
	yappins: many(yappins),
	yappinLikes: many(yappinLike),
	follows_followerId: many(follows, {
		relationName: "follows_followerId_users_id"
	}),
	follows_followingId: many(follows, {
		relationName: "follows_followingId_users_id"
	}),
	likeNotifications_byId: many(likeNotifications, {
		relationName: "likeNotifications_byId_users_id"
	}),
	likeNotifications_userId: many(likeNotifications, {
		relationName: "likeNotifications_userId_users_id"
	}),
	reminders: many(reminders),
}));

export const yappinCommentRelations = relations(yappinComment, ({one, many}) => ({
	commentNotifications: many(commentNotifications),
	user: one(users, {
		fields: [yappinComment.userId],
		references: [users.id]
	}),
	yappin: one(yappins, {
		fields: [yappinComment.yappinId],
		references: [yappins.id]
	}),
}));

export const yappinsRelations = relations(yappins, ({one, many}) => ({
	yappinComments: many(yappinComment),
	yappinImages: many(yappinImage),
	user: one(users, {
		fields: [yappins.userId],
		references: [users.id]
	}),
	yappinLikes: many(yappinLike),
}));

export const preferenceYappinRelations = relations(preferenceYappin, ({one}) => ({
	user: one(users, {
		fields: [preferenceYappin.userId],
		references: [users.id]
	}),
}));

export const yappinImageRelations = relations(yappinImage, ({one}) => ({
	yappin: one(yappins, {
		fields: [yappinImage.yappinId],
		references: [yappins.id]
	}),
}));

export const yappinLikeRelations = relations(yappinLike, ({one, many}) => ({
	user: one(users, {
		fields: [yappinLike.userId],
		references: [users.id]
	}),
	yappin: one(yappins, {
		fields: [yappinLike.yappinId],
		references: [yappins.id]
	}),
	likeNotifications: many(likeNotifications),
}));

export const followsRelations = relations(follows, ({one}) => ({
	user_followerId: one(users, {
		fields: [follows.followerId],
		references: [users.id],
		relationName: "follows_followerId_users_id"
	}),
	user_followingId: one(users, {
		fields: [follows.followingId],
		references: [users.id],
		relationName: "follows_followingId_users_id"
	}),
}));

export const likeNotificationsRelations = relations(likeNotifications, ({one}) => ({
	user_byId: one(users, {
		fields: [likeNotifications.byId],
		references: [users.id],
		relationName: "likeNotifications_byId_users_id"
	}),
	user_userId: one(users, {
		fields: [likeNotifications.userId],
		references: [users.id],
		relationName: "likeNotifications_userId_users_id"
	}),
	yappinLike: one(yappinLike, {
		fields: [likeNotifications.yappinLikeId],
		references: [yappinLike.id]
	}),
}));

export const remindersRelations = relations(reminders, ({one}) => ({
	user: one(users, {
		fields: [reminders.userId],
		references: [users.id]
	}),
}));