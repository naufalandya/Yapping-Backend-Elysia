import Elysia, { t } from "elysia";
import { isAuthenticated } from "../middlewares/isAuthenticated.middleware";
import { prisma } from "../libs";
import { stringValidation, stringValidationOptional } from '../error/validation.error';
import { User, Yappins } from "../types/types";
import { BadRequest, Conflict, ErrorNotFound, InvalidData } from '../error/error.handler';
import { uploadImage } from "../utils/imagekit.util";
import { detectMimeType } from "../utils/checkmime.util";

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
                        id : true,
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
            })
    ,})
    .get("/profile/:username", async ({ user, params }: { user: { id: string; name: string, exp : number }, params: { username : string} }) => {
        try {
            
            const result = await prisma.users.findUnique({
                where : {
                    username : params.username
                },
                select : {
                    id : true,
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
            })
    ,})
    .put(
        "/profile",
        async ({ user, body }: { user: { id: string; name: string; exp: number }; body: Partial<User> }) => {
            try {
                
                const userId = Number(user.id);
    
                const existingUser = await prisma.users.findUnique({
                    where: { id: userId },
                    // select: {
                    //     name: true,
                    //     username: true,
                    //     bio: true,
                    //     created_at: true,
                    //     avatar_link: true,
                    // },
                });

                if (!existingUser) {
                    return {
                        status: false,
                        message: 'User not found',
                    };
                }

                if(body.username) {
                    const isUsername = await prisma.users.findUnique({
                        where : {
                            username : body.username
                        }
                    })

                    if(isUsername?.username === body.username){
                        throw new Conflict("You already used this username buddy !")
                    }

                    if(isUsername){
                        throw new Conflict("Oh no !, this username is already used !")
                    }
                }
    
                const updatedUser = await prisma.users.update({
                    where: { id: userId },
                    data: {
                        name: body.name, 
                        username: body.username, 
                        bio: body.bio,
                        updated_at: new Date(), 
                    },
                });
                
                console.log(body)

                const upsertPreference = await prisma.preference_yappin.upsert({
                    where: { user_id: userId },
                    update: {
                        preference_tag_one: body.preference_yappin?.preference_tag_1,
                        total_engage_one: body.preference_yappin?.total_engage_one,
                        preference_tag_two: body.preference_yappin?.preference_tag_2,
                        total_engage_two: body.preference_yappin?.total_engage_two,
                        preference_tag_three: body.preference_yappin?.preference_tag_3,
                        total_engage_three: body.preference_yappin?.total_engage_three,
                        preference_tag_four: body.preference_yappin?.preference_tag_4,
                        total_engage_four: body.preference_yappin?.total_engage_four,
                    },
                    create: {
                        user_id: userId,
                        preference_tag_one: body.preference_yappin?.preference_tag_1,
                        total_engage_one: body.preference_yappin?.total_engage_one || 0,
                        preference_tag_two: body.preference_yappin?.preference_tag_2,
                        total_engage_two: body.preference_yappin?.total_engage_two || 0,
                        preference_tag_three: body.preference_yappin?.preference_tag_3,
                        total_engage_three: body.preference_yappin?.total_engage_three || 0,
                        preference_tag_four: body.preference_yappin?.preference_tag_4,
                        total_engage_four: body.preference_yappin?.total_engage_four || 0,
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
                        preference_tag_1: t.Optional(t.String()),
                        preference_tag_2: t.Optional(t.String()),
                        preference_tag_3: t.Optional(t.String()),
                        preference_tag_4: t.Optional(t.String()),
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

    .get("/profile-preference", async ({ user }: { user: { id: string; name: string, exp : number } }) => {
        try {

            const preferences = await prisma.preference_yappin.findUnique({
                where: {
                    user_id: Number(user.id),
                },
                select: {
                    total_engage_one: true,
                    total_engage_two: true,
                    total_engage_three: true,
                    total_engage_four: true,
                    preference_tag_one: true,
                    preference_tag_two: true,
                    preference_tag_three: true,
                    preference_tag_four: true,
                },
            });
            
            // Check if preferences are empty
            if (!preferences) {
                return {
                    status: true,
                    message: 'No preferences found!',
                    data: preferences,
                    feedback: "You haven't chosen any content preferences yet!",
                };
            }
            
            // Use the first preference object
            const preference = preferences;
            
            // Extract and filter preferences
            const tags = [
                preference.preference_tag_one,
                preference.preference_tag_two,
                preference.preference_tag_three,
                preference.preference_tag_four,
            ].filter(Boolean);
            
            const totalEngagements = [
                preference.total_engage_one,
                preference.total_engage_two,
                preference.total_engage_three,
                preference.total_engage_four,
            ].filter((engagement) => engagement !== null); // Filter out null values
            
            // Check if totalEngagements array is empty after filtering
            if (totalEngagements.length === 0) {
                return {
                    status: true,
                    message: 'No engagement data available!',
                    data: preferences,
                    feedback: 'It seems you have not engaged with any content yet!',
                };
            }
            
            // Calculate the highest and lowest engagements
            const highestEngagement = Math.max(...totalEngagements);
            const lowestEngagement = Math.min(...totalEngagements);
            
            // Get the corresponding tags for highest and lowest engagement
            const highestTagIndex = totalEngagements.indexOf(highestEngagement);
            const lowestTagIndex = totalEngagements.indexOf(lowestEngagement);
            
            const highestTag = tags[highestTagIndex] || 'Unknown';
            const lowestTag = tags[lowestTagIndex] || 'Unknown';
            
            // Generate feedback based on the number of selected preferences
            let feedbackMessage;
            
            if (tags.length < 4) {
                feedbackMessage = `You've picked some content preferences! You chose: ${tags.join(', ')}. Consider exploring more options!`;
            } else {
                feedbackMessage = `Awesome! You're all set with preferences for: ${tags.join(', ')}.`;
            }
            
            // Generate random feedback messages
            const randomFeedbacks = [
                `Awesome! We got your data! You've been loving content about: ${tags.join(', ')}. Meanwhile, you hardly engage with: ${lowestTag}.`,
                `Yay! We’ve got some cool insights for you! Turns out you really enjoy content like: ${tags.join(', ')}. But it looks like you don’t show much interest in: ${lowestTag}.`,
                `Look at this! Your data is in! It looks like you’re a fan of: ${tags.join(', ')}. On the flip side, the stuff you barely check out is: ${lowestTag}.`,
                `Hey there! We've dug up some fun info! Check this out: You really like these kinds of content: ${tags.join(', ')}. But these are the ones that seem to go unnoticed: ${lowestTag}.`,
                `Woohoo! We found some interesting insights! You’re often diving into content like: ${tags.join(', ')}. However, there are a few things that you seem to overlook: ${lowestTag}.`,
            ];
        
            // Randomly select one feedback message
            const randomIndex = Math.floor(Math.random() * randomFeedbacks.length);
            return {
                status: true,
                message: 'Data retrieved successfully!',
                data: preferences,
                feedback: randomFeedbacks[randomIndex],
            };
            
        } catch (err) {
            throw err;
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
    .get("/profile/daily-analytic", async ({ user }: { user: { id: string; name: string, exp : number } }) => {
        try {
        
            // Define the date range for the past 7 days
            const today = new Date();
            const lastWeek = new Date(today);
            lastWeek.setDate(today.getDate() - 7);
        
            // Fetch the number of yappins created by the logged-in user in the last 7 days
            const yappinStats = await prisma.yappins.groupBy({
                by: ['created_at'],
                where: {
                    user_id: Number(user.id), // filter by the logged-in user's ID
                    created_at: {
                        gte: lastWeek,
                        lte: today,
                    },
                },
                _count: {
                    id: true,
                },
                orderBy: {
                    created_at: 'asc',
                },
            });
        
            // Fetch the number of reminders created by the logged-in user in the last 7 days
            const reminderStats = await prisma.reminders.groupBy({
                by: ['created_date'],
                where: {
                    user_id:  Number(user.id), // filter by the logged-in user's ID
                    created_date: {
                        gte: lastWeek,
                        lte: today,
                    },
                },
                _count: {
                    id: true,
                },
                orderBy: {
                    created_date: 'asc',
                },
            });
        
            const yappinCount: { [key: string]: number } = {};
            yappinStats.forEach((stat) => {
                const date = new Date(stat.created_at).toLocaleDateString();
                yappinCount[date] = (yappinCount[date] || 0) + stat._count.id;
            });
        
            const reminderCount: { [key: string]: number } = {};
            reminderStats.forEach((stat) => {
                const date = new Date(stat.created_date).toLocaleDateString();
                reminderCount[date] = (reminderCount[date] || 0) + stat._count.id;
            });
        
            let yappinSummary = '';
            const totalYappins = Object.values(yappinCount).reduce((acc, count) => acc + count, 0);
        
            if (totalYappins > 5) {
                yappinSummary = "You are very unproductive today with more than 5 yapping posts! It might be time to explore educational content on platforms like Udemy, edX, or Coursera to enhance your skills.";
            } else if (totalYappins > 2) {
                yappinSummary = "It seems you are not very productive with 3-5 yapping posts. Maybe try shifting some of your focus to educational content like Udemy or edX.";
            } else if (totalYappins <= 2 && totalYappins > 0) {
                yappinSummary = "Nothing to post? Perhaps you could look for ideas to explore other interesting content.";
            } else {
                yappinSummary = "No yapping posts in a week! Come on, try to be more active!";
            }
        
            let reminderSummary = '';
            const totalReminders = Object.values(reminderCount).reduce((acc, count) => acc + count, 0);
        
            if (totalReminders > 7) {
                reminderSummary = "Be careful, too many reminders in a day can make you tired and worn out!";
            } else if (totalReminders >= 3) {
                reminderSummary = "Awesome! You are very productive with 3-7 reminders today.";
            } else if (totalReminders > 0) {
                reminderSummary = "Wow, you seem to be taking it easy today with only " + totalReminders + " reminders.";
            } else {
                reminderSummary = "No reminders today! Maybe you can plan some activities.";
            }
        
            return {
                status: true,
                message: 'Daily statistics retrieved successfully!',
                data: {
                    yappin: yappinCount,
                    reminder: reminderCount,
                    summary: {
                        yappin: yappinSummary,
                        reminder: reminderSummary,
                    },
                },
            };
        } catch (error) {
            console.error('Error fetching user daily statistics:', error);
            return {
                status: false,
                message: 'Failed to retrieve daily statistics.',
            };
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
    .put("/profile-pic", async ({ user, body }: { user: { id: string; name: string; exp: number }; body: Yappins }) => {
        try {

            const result = await prisma.users.findUnique(
                { where : {
                    id : Number(user?.id)
                }}
            )

            if(!result) {
                throw new ErrorNotFound("user does not exist !")
            }

            const arrayBuffer = await body.image.arrayBuffer();
            const mimeType= await detectMimeType(arrayBuffer)
            const mediaBuffer = Buffer.from(arrayBuffer)

            if(mimeType && (mimeType.startsWith('image/'))){
                const analysisResponse = await fetch('http://localhost:5000/predict/image', {
                    method: 'POST',
                    body: mediaBuffer,
                    headers: { 'Content-Type': 'application/octet-stream' } 
                });   
                
                const analysisResult = await analysisResponse.json();
                if(analysisResult.message !== "success"){
                    throw new BadRequest("image does not meet our policy")
                }

                const uploadResponse = await uploadImage(mediaBuffer, result?.username + String(new Date())); 
                
                await prisma.users.update(
                    { 
                        where : {
                            id : Number(user.id)
                        },
                        data : {
                            avatar_link : uploadResponse.url,
                        }

                    }
                )

                return {
                    status: true,
                    message: "Success",
                    data : uploadResponse.url,
                };

            }

        } catch (err){
            throw err
        }
    }, {
        body : t.Object({
            image: t.File({
                type : ['image/jpeg', 'image/png', 'image/webp', 'video/mp4', 'video/mpeg', 'video/x-flv'],
                error( { errors }) {
                    console.log(errors)
                    if (errors[0].type == 31){
                        throw new InvalidData(`property image/video is required !`)
                    }
                }
            }),})
    } )
export default UserRoute