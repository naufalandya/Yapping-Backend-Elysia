import Elysia, { error, t } from "elysia";
import { prisma } from "../libs";
import { getPublicYappinsAPIdoc, postMyYappinsAPIdoc } from '../docs/yappins.doc';
import { isAuthenticated } from "../middlewares/isAuthenticated.middleware";
import { Yappins } from "../types/types";
import { BadRequest, InvalidData } from "../error/error.handler";
import { stringValidation, stringValidationOptional } from '../error/validation.error';
import { uploadImage, uploadVideo } from "../utils/imagekit.util";
import { detectMimeType } from "../utils/checkmime.util";
import { createYappin, createYappinVideo } from "../services/yappin.service";
import db from "../libs/drizzle.lib";
import { users, yappinImage, yappins } from '../../drizzle/schema';
import { desc, eq, gt } from "drizzle-orm";
import { containsValidLinks } from "../utils/checkLink.util";
import { toBoolean } from "../utils/convertBoolean";

const YappingRoute = new Elysia()
    .use(isAuthenticated)
    .get("/yapping/p/:username", async ( { user, params }: { user: { id: string; name: string, exp : number }, params : { username : string} }) => {
        try {


            const user = await prisma.users.findUnique({
                where : {
                    username : params.username
                }
            })

            if(!user){
                return {
                    status: false,
                    message: "User not found",
                    data: null
                };
            }

            const page = 1; 
            const limit = 10;
                        
            const result = await prisma.yappins.findMany({
                orderBy: {
                    created_at: 'desc',
                },
                skip: (page - 1) * limit,
                take: limit, 
                where: {
                    is_public: true,
                    user_id: Number(user.id)
                },
                select: {
                    id: true,
                    caption: true,
                    total_likes: true,
                    total_comments : true,
                    is_public: true,
                    location: true,
                    created_at: true,
                    users: {
                        select: {
                            username: true,
                            avatar_link: true
                        }
                    },
                    yappin_image: {
                        select: {
                            image_link: true,
                            type: true,
                        }
                    },
                    // Tambahkan relasi untuk memeriksa apakah user telah like
                    YappinLike: {
                        where: {
                            user_id: Number(user.id)
                        },
                        select: {
                            id: true
                        }
                    }
                }
            });
            
            // Pastikan `result` tidak null
            if (!result) {
                return {
                    status: false,
                    message: "Yappin not found",
                    data: null
                };
            }
            
            // Tambahkan properti `isLiked` berdasarkan apakah `YappinLike` ada atau tidak
            const updatedPosts = result.map(post => ({
                ...post,
                isLiked: post.YappinLike.length > 0 // Jika ada like dari user, maka isLiked akan true
            }));
            
            // Kembalikan hasil dengan status sukses
            return {
                status: true,
                message: "Success",
                data: updatedPosts
            };
            
        } catch (err) {
            throw err
        }
    }, {
    })
    .get("/yapping/:id", async ( { user, params }: { user: { id: string; name: string, exp : number }, params : { id : string} }) => {
        try {

            console.log(params)
                        
            const result = await prisma.yappins.findUnique({
                where: {
                    is_public: true,
                    id: Number(params.id)
                },
                select: {
                    id: true,
                    caption: true,
                    total_likes: true,
                    total_comments : true,
                    is_public: true,
                    location: true,
                    created_at: true,
                    users: {
                        select: {
                            username: true,
                            avatar_link: true
                        }
                    },
                    yappin_image: {
                        select: {
                            image_link: true,
                            type: true,
                        }
                    },
                    // Tambahkan relasi untuk memeriksa apakah user telah like
                    YappinLike: {
                        where: {
                            user_id: Number(user.id)
                        },
                        select: {
                            id: true
                        }
                    }
                }
            });
            
            // Pastikan `result` tidak null
            if (!result) {
                return {
                    status: false,
                    message: "Yappin not found",
                    data: null
                };
            }
            
            // Tambahkan properti `isLiked` berdasarkan apakah `YappinLike` ada atau tidak
            const updatedPost = {
                ...result,
                isLiked: result.YappinLike.length > 0 // Jika ada like dari user, maka isLiked akan true
            };
            
            // Kembalikan hasil dengan status sukses
            return {
                status: true,
                message: "Success",
                data: updatedPost
            };
            
        } catch (err) {
            throw err
        }
    }, {
        params: t.Object({
            id: t.Number()
        })

    })
    .get("/yapping", async ( 
        { user, query }: { user: 
            { id: string; 
              name: string, 
              exp : number, 
              preference_one : string,
              preference_two : string,
              preference_three : string,
              preference_four : string,           
            }, query : {
                music : string,
                male : string,
                female : string,
                nonHijab : string,
                anime : string,
            } }) => {
        try {

            console.log(query)

            const music = toBoolean(query.music);
            const male = toBoolean(query.male);
            const female = toBoolean(query.female);
            // const nonHijab = toBoolean(query.nonHijab);
            const anime = toBoolean(query.anime);
            
            const page = 1; 
            const limit = 10;
            
            // Define conditions for Prisma query based on preferences
            const conditions = [];
            
            // Condition for music
            if (music) {
              conditions.push({ is_music: false });
            }
            
            // Condition for male
            if (male) {
              conditions.push({ is_male: false });
            }
            
            // Condition for anime
            if (anime) {
              conditions.push({ anime: false });
            }
            
            // Handle conditions for female and nonHijab
            if (female) {
              // If female is true, hide all female videos
              conditions.push({ is_female: false });
            }
            
            // If only nonHijab is true, hide non-hijab female videos
            // if (nonHijab) {
            //   // Hide only non-hijab females but keep hijab females
            //   conditions.push({ is_non_hijab_female: false });
            // }
            
            // // If both female and nonHijab are true, both should be hidden
            // if (female && nonHijab) {
            //   conditions.push({
            //     OR: [
            //       { is_female: false }, // Hide all females
            //       { is_non_hijab_female: false } // Hide non-hijab females
            //     ]
            //   });
            // }
            
            // Prisma query using dynamic conditions
            const result = await prisma.yappins.findMany({
              where: {
                is_public: true,
                AND: conditions,
                OR: [
                  { tag_one_name: user.preference_one },
                  { tag_two_name: user.preference_two },
                  { tag_three_name: user.preference_three },
                  { tag_four_name: user.preference_four }
                ]
              },
              orderBy: {
                created_at: 'desc'
              },
              skip: (page - 1) * limit,
              take: limit,
              select: {
                id: true,
                caption: true,
                total_likes: true,
                total_comments: true,
                is_public: true,
                location: true,
                created_at: true,
                users: {
                  select: {
                    username: true,
                    avatar_link: true
                  }
                },
                yappin_image: {
                  select: {
                    image_link: true,
                    type: true
                  }
                },
                // Check if the user has liked the yappin
                YappinLike: {
                  where: {
                    user_id: Number(user.id)
                  },
                  select: {
                    id: true
                  }
                }
              }
            });
            
            
            
            // Map the result to include `isLiked` status
            const updatedPosts = result.map(post => ({
                ...post,
                isLiked: post.YappinLike.length > 0 // Jika ada like dari user, maka isLiked akan true
            }));

            return {
                status: true,
                message: "Success",
                data : updatedPosts
            };
        } catch (err) {
            throw err
        }
    }, {
        ...getPublicYappinsAPIdoc as object
    })

    .get("/my-yapping", async ({ user }: { user: { id: string; name: string, exp : number } }) => {
        try {

         

            const page = 1; 
            const limit = 10;
            
            const result = await prisma.yappins.findMany({
                where: {
                    is_public: true,
                    user_id : Number(user.id)
                },
                orderBy: {
                    created_at: 'desc',
                },
                skip: (page - 1) * limit,
                take: limit, 
                select: {
                    id: true,
                    caption: true,
                    total_likes: true,
                    total_comments : true,
                    is_public: true,
                    created_at: true,
                    users: {
                        select: {
                            username: true,
                            avatar_link: true
                        }
                    },
                    yappin_image : {
                        select : {
                            image_link : true,
                            type : true
                        }
                    }
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
        ...getPublicYappinsAPIdoc as object,
    })

    .post("/my-yapping", async ({ user, body }: { user: { id: string; username: string, exp : number }, body : Yappins }) => {


        try {

            console.log(body)

            let tag_one_id = Number(body.tag_1_id) 
            let tag_two_id =  Number(body.tag_2_id) 
            let tag_three_id =  Number(body.tag_3_id) 
            let tag_four_id =  Number(body.tag_4_id) 

            if(typeof tag_one_id !== 'number' || typeof tag_two_id !== 'number' || typeof tag_three_id !== 'number' || typeof tag_four_id !== 'number'){
                throw new BadRequest("tag id must be a number")
            }

            const allowedDomains = [
                'google.com',
                'github.com',
                'cnn.com',
                'myanimelist.com',
                'yahoo.com',
                'gmail.com',
                'outlook.com',
                'kentang.my.id',
                'example.com' 
            ];
            
            if (!containsValidLinks(body.caption, allowedDomains)) {
                throw new BadRequest("Your caption contains disallowed links!");
            }
    

            let is_public;
            switch (body.is_public) {
                case '1':
                    is_public = true;
                    break; 
                default:
                    is_public = false;
            }

            const response = await fetch('http://localhost:5000/check-text/yapping', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ text : body.caption, location : body.location })
            });

            if(!response.ok){
                throw new BadRequest("Your caption contains negativity, bad word, or profanity !")
            }

            const arrayBuffer = await body.image.arrayBuffer();
            const mimeType= await detectMimeType(arrayBuffer)
            const mediaBuffer = Buffer.from(arrayBuffer)

            let gender = undefined

            if(mimeType && (mimeType.startsWith('image/'))){

                const formData = new FormData();
                formData.append('image', body.image); // Menggunakan Blob langsung

                const analysisResponse = await fetch('http://localhost:5000/v3/detect-image-test', {
                    method: 'POST',
                    body: formData // Mengirim form data
                });
                
                const analysisResult = await analysisResponse.json();

                console.log(analysisResult)
                if(analysisResult.message !== "success"){
                    throw new BadRequest("image does not meet our policy")
                }

                if (analysisResult.gender === "female" || analysisResult.gender === "male"){
                    gender = analysisResult.gender
                }

                const uploadResponse = await uploadImage(mediaBuffer, user.username + String(new Date())); 
                const yappin = await createYappin(gender, is_public, tag_one_id, tag_two_id, tag_three_id, tag_four_id, user, body)
        
                await prisma.yappin_image.create({
                    data: {
                        yappin_id: yappin.id,
                        image_link: uploadResponse.url,
                        type : 'IMAGE'
                    }
                });
            }

            if(mimeType && (mimeType.startsWith('video/'))){
                const analysisResponse = await fetch('http://localhost:5000/predict/video', {
                    method: 'POST',
                    body: mediaBuffer,
                    headers: { 'Content-Type': 'application/octet-stream' } 
                });   
                
                const analysisResult = await analysisResponse.json();

                if(analysisResult.message !== "success"){
                    throw new BadRequest("video does not meet our policy")
                }

                if (analysisResult.gender === "female" || analysisResult.gender === "male"){
                    gender = analysisResult.gender
                }

                const uploadResponse = await uploadVideo(mediaBuffer, user.username + String(new Date())); 

                const yappin = await createYappinVideo(analysisResult.music, gender, is_public, tag_one_id, tag_two_id, tag_three_id, tag_four_id, user, body)
        
                await prisma.yappin_image.create({
                    data: {
                        yappin_id: yappin.id,
                        image_link: uploadResponse.url,
                        type : 'VIDEO'
                    }
                });
            }

            return {
                status: true,
                message: "Success",
            };
        
        } catch (err) {
            throw err;
        } 
        
    }, {
        ...postMyYappinsAPIdoc as object,

        headers: t.Object({
            authorization: t.String({
                example: "Bearer 12345",
                minLength: 1,
                maxLength: 500,
                error( { errors, validator, type, value }){
                    stringValidation("header", 1, 400, errors)
                }            
            }),
        }),

        body : t.Object({
            image: t.File({
                type : ['image/jpeg', 'image/png', 'image/webp', 'video/mp4', 'video/mpeg', 'video/x-flv'],
                error( { errors }) {
                    console.log(errors)
                    if (errors[0].type == 31){
                        throw new InvalidData(`property image/video is required !`)
                    }
                }
            }),
            caption: t.String({
                required: true,
                example: "Ball",
                minLength: 1,
                maxLength: 400,
                error( { errors, validator, type, value }){
                    stringValidation("caption", 1, 400, errors)
                }
            }),
            is_public: t.Optional(t.String({
                required: 1,
                example: "1",
                pattern : '^[01]$',
                error( { errors, validator, type, value }){
                    stringValidation("is_public", 1, 1, errors)
                }
            })
            ),
            tag_1_id: t.String({
                required: true,
                example: "1",
                minLength: 1,
                maxLength: 4,
                error( { errors, validator, type, value }){
                    stringValidation("tag_one_id", 1, 4, errors)
                }  
            }),
            location : t.String(
                {
                    example: "Disney Land",
                    minLength: 2,
                    maxLength: 70,
                    error( { errors, validator, type, value }){
                        stringValidation("location", 2, 70, errors)
                    }
                    
                }
            ),
            tag_1_name: t.String({
                required: true,
                example: "Ball",
                minLength: 1,
                maxLength: 20,
                error( { errors, validator, type, value }){
                    stringValidation("tag_one_name", 1, 20, errors)
                }
                
            }),
            tag_2_id: t.Optional(t.String({
                example: "1",
                minLength: 1,
                maxLength: 4,
                error( { errors, validator, type, value }){
                    stringValidationOptional("tag_two_id", 1, 4, errors)
                }  
            })),
            tag_2_name: t.Optional(t.String(
                {
                    example: "Vlog",
                    minLength: 1,
                    maxLength: 20,
                    error( { errors, validator, type, value }){
                        stringValidationOptional("tag_two_name", 1, 20, errors)
                    }                    
                }
            )),
            tag_3_id: t.Optional(t.String({
                example: "1",
                minLength: 1,
                maxLength: 4,
                error( { errors, validator, type, value }){
                    stringValidationOptional("tag_three_id", 1, 4, errors)
                }  
            })),
            tag_3_name: t.Optional(t.String(
                {
                    example: "Outdoor",
                    minLength: 1,
                    maxLength: 20,
                    error( { errors, validator, type, value }){
                        stringValidationOptional("tag_three_name", 1, 20, errors)
                    }
                    
                }
            )),
            tag_4_id: t.Optional(t.String({
                example: "1",
                minLength: 1,
                maxLength: 4,
                error( { errors, validator, type, value }){
                    stringValidationOptional("tag_four_id", 1, 4, errors)
                }  
            })),
            tag_4_name: t.Optional(t.String(
                {
                    example: "Fun",
                    minLength: 1,
                    maxLength: 20,
                    error( { errors, validator, type, value }){
                        stringValidationOptional("tag_four_name", 1, 20, errors)
                    }
                    
                }
            )),
          }),

          

          
    })


export default YappingRoute