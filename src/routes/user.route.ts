import Elysia, { t } from "elysia";
import { isAuthenticated } from "../middlewares/isAuthenticated.middleware";
import { prisma } from "../libs";
import { stringValidation, stringValidationOptional } from '../error/validation.error';
import { User } from "../types/types";

const UserRoute = new Elysia()
    .use(isAuthenticated)
    .get("/profile", async ({ user }: { user: { id: string; name: string, exp : number } }) => {
            try {

                console.log(user)
                
                const result = await prisma.users.findUnique({
                    where : {
                        id : Number(user.id)
                    },
                    select : {
                        name : true,
                        username : true,
                        bio : true,
                        created_at : true,
                        avatar_link : true,
                    }
                })

                if(!result){
                    return {
                        status: false,
                        message : 'user not found'
                    }
                }
                console.log(result)

                return {
                    status: true,
                    message: "Success",
                    data : result,
                };

            } catch (err) {
                throw err
            }
        }, {
            headers: t.Object({
                authorization: t.String({
                    example: "Bearer 12345",
                    minLength: 1,
                    maxLength: 500,
                    error({ errors }) {
                        stringValidation("header", 1, 500, errors);
                    }
                }),
            }),})
            .put(
                "/profile",
                async ({ user, body }: { user: { id: string; name: string; exp: number }; body: Partial<User> }) => {
                    try {
                        
                        const userId = Number(user.id);
            
                        const existingUser = await prisma.users.findUnique({
                            where: { id: userId },
                            select: {
                                name: true,
                                username: true,
                                bio: true,
                                created_at: true,
                                avatar_link: true,
                            },
                        });

                        console.log("tes")
            
                        if (!existingUser) {
                            return {
                                status: false,
                                message: 'User not found',
                            };
                        }
            
                        console.log(body);
            
                        const updatedUser = await prisma.users.update({
                            where: { id: userId },
                            data: {
                                name: body.name, 
                                username: body.username, 
                                bio: body.bio,
                                updated_at: new Date(), 
                            },
                        });
            
                        const upsertPreference = await prisma.preference_yappin.upsert({
                            where: { user_id: userId },
                            update: {
                                preference_tag_one: body.preference_yappin?.preference_tag_one,
                                total_engage_one: body.preference_yappin?.total_engage_one,
                                preference_tag_two: body.preference_yappin?.preference_tag_two,
                                total_engage_two: body.preference_yappin?.total_engage_two,
                                preference_tag_three: body.preference_yappin?.preference_tag_three,
                                total_engage_three: body.preference_yappin?.total_engage_three,
                                preference_tag_four: body.preference_yappin?.preference_tag_four,
                                total_engage_four: body.preference_yappin?.total_engage_four,
                            },
                            create: {
                                user_id: userId,
                                preference_tag_one: body.preference_yappin?.preference_tag_one,
                                total_engage_one: body.preference_yappin?.total_engage_one,
                                preference_tag_two: body.preference_yappin?.preference_tag_two,
                                total_engage_two: body.preference_yappin?.total_engage_two,
                                preference_tag_three: body.preference_yappin?.preference_tag_three,
                                total_engage_three: body.preference_yappin?.total_engage_three,
                                preference_tag_four: body.preference_yappin?.preference_tag_four,
                                total_engage_four: body.preference_yappin?.total_engage_four,
                            },
                        });
            
                        return {
                            status: true,
                            message: 'Profile updated successfully',
                            data: {
                                user: updatedUser,
                                preference: upsertPreference,
                            },
                        };
                    } catch (err) {
                        throw err
                    }
                },
                {
                    body : t.Object({
                        name: t.Optional(
                            t.String({
                                example: "Naufal Andya",
                                minLength: 5,
                                maxLength: 100,
                                error({ errors }) {
                                    stringValidationOptional("name", 5, 100, errors);
                                }
                            })
                        ),
                        username: t.Optional(
                            t.String({
                                example: "naufal123",
                                minLength: 3,
                                maxLength: 50,
                                error({ errors }) {
                                    stringValidationOptional("username", 3, 50, errors);
                                }
                            })
                        ),
                        bio: t.Optional(
                            t.String({
                                example: "Software Engineer and Developer.",
                                maxLength: 255,
                                error({ errors }) {
                                    stringValidationOptional("bio", 0, 255, errors); 
                                }
                            })
                        ),
                        preference_yappin: t.Optional(
                            t.Object({
                                preference_tag_one: t.Optional(t.String()),
                                preference_tag_two: t.Optional(t.String()),
                                preference_tag_three: t.Optional(t.String()),
                                preference_tag_four: t.Optional(t.String()),
                            })
                        ),
                    }),
                    headers: t.Object({
                        authorization: t.String({
                            example: "Bearer 12345",
                            minLength: 1,
                            maxLength: 500,
                            error({ errors }) {
                                stringValidation("header", 1, 500, errors);
                            }
                        }),
                    }),
                }
            )

    .get("/profile-preference", ( { }) => {
        try {

        } catch (err){

        }
    }, {
        headers: t.Object({
            authorization: t.String({
                example: "Bearer 12345",
                minLength: 1,
                maxLength: 500,
                error({ errors }) {
                    stringValidation("header", 1, 500, errors);
                }
            }),
        }),
    })
export default UserRoute