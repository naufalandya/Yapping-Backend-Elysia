import Elysia, { error, t } from "elysia";
import { prisma } from "../libs";
import { getPublicYappinsAPIdoc, postMyYappinsAPIdoc } from '../docs/yappins.doc';
import { isAuthenticated } from "../middlewares/isAuthenticated.middleware";
import { Reminder, Yappins } from "../types/types";
import { BadRequest, InvalidData } from "../error/error.handler";
import { stringValidation, stringValidationOptional } from '../error/validation.error';
import { uploadImage, uploadVideo } from "../utils/imagekit.util";
import { detectMimeType } from "../utils/checkmime.util";
import { createYappin } from "../services/yappin.service";
import { createReminder } from "../services/reminder.service";
import { postMyReminderAPIdoc } from "../docs/reminder.doc";

const ReminderRoute = new Elysia()
    .use(isAuthenticated)
    .get("/reminder", async ( { body }) => {
        try {

            const page = 1; 
            const limit = 10;
            
            const result = await prisma.reminders.findMany({
                where: {
                    is_public: true,
                },
                orderBy: {
                    deadline_date: 'desc',
                },
                skip: (page - 1) * limit,
                take: limit, 
                select: {
                    id: true,
                    title : true,
                    content : true,
                    is_finished : true,
                    started_date : true,
                    finished_date: true,
                    created_date: true,
                    deadline_date: true,
                    users: {
                        select: {
                            username: true,
                            avatar_link: true
                        }
                    },
                }
            });

            return {
                status: true,
                message: "Success",
                data : result
            };
        } catch (err) {
            throw err
        }
    }, {
        // ...getPublicYappinsAPIdoc as object
    })

    .get("/my-reminder", async ({ user }: { user: { id: string; name: string, exp : number } }) => {
        try {

            console.log(user.id)

            const page = 1; 
            const limit = 10;
            
            const result = await prisma.reminders.findMany({
                where: {
                    AND : [
                        {
                            is_public : true
                        },
                        {
                            user_id : Number(user.id)
                        }

                    ]
                },
                orderBy: {
                    created_date: 'desc',
                },
                skip: (page - 1) * limit,
                take: limit, 
                select: {
                    id: true,
                    title : true,
                    content : true,
                    is_finished : true,
                    started_date : true,
                    finished_date: true,
                    created_date: true,
                    deadline_date: true,
                    users: {
                        select: {
                            username: true,
                            avatar_link: true
                        }
                    },
                }
            });

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
        // ...getPublicYappinsAPIdoc as object,
    })

    .post("/my-reminder", async ({ user, body }: { user: { id: string; username: string, exp: number }, body: Reminder }) => {
        try {

            console.log(user)
            // Menentukan nilai is_public berdasarkan body.is_public
            const is_public = body.is_public === '1';
    
            // Membuat pengingat dengan memanggil createReminder
            await createReminder(is_public, user, body);
    
            return {
                status: true,
                message: "Success",
            };
        } catch (err) {
            console.log(err);
            throw err; // Pastikan untuk melempar error yang tepat
        }
    }, {
        ...postMyReminderAPIdoc as object, // Pastikan postMyYappinsAPIdoc didefinisikan sebelumnya
    
        headers: t.Object({
            authorization: t.String({
                example: "Bearer 12345",
                error({ errors }) {
                    stringValidation("header", 1, 500, errors);
                }
            }),
        }),
    
        body: t.Object({
            title: t.String({
                required: true,
                minLength: 1,
                maxLength: 400,
                error({ errors }) {
                    stringValidation("title", 1, 400, errors);
                }
            }),
            content: t.String({
                required: true,
                minLength: 1,
                maxLength: 400,
                error({ errors }) {
                    stringValidation("content", 1, 400, errors);
                }
            }),
            started_date: t.Optional(t.Date({
                required: true,
                error({ errors }) {

                    if (errors.length > 0) {
                        return errors
                    }
                }
            })),
            // finished_date: t.Optional(t.Date({
            //     required: true,
            //     error({ errors }) {
            //         if (errors.length > 0) {
            //             throw new InvalidData("finished_date is required.");
            //         }
            //     }
            // })),
            deadline_date: t.Date({
                required: true,
                error({ errors }) {
                    if (errors.length > 0) {
                        throw new InvalidData("deadline_date is required.");
                    }
                }
            }),
            // created_date: t.Date({
            //     required: true,
            // }),
            location: t.String({
                required: true,
                example: "Office",
                minLength: 1,
                maxLength: 70,
                error({ errors }) {
                    stringValidation("location", 1, 70, errors);
                }
            }),
            is_public: t.Optional(t.String({
                required: false,
                example: "1",
                pattern: '^[01]$',
                error({ errors }) {
                    stringValidation("is_public", 1, 1, errors);
                }
            })),
        })
    });

export default ReminderRoute