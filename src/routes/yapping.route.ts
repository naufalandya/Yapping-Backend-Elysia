import Elysia, { error, t } from "elysia";
import { prisma } from "../libs";
import { getPublicYappinsAPIdoc } from '../docs/yappins.doc';
import { isAuthenticated } from "../middlewares/isAuthenticated.middleware";
import { Yappins } from "../types/types";
import { BadRequest, InvalidData } from "../error/error.handler";
import { stringValidation, stringValidationOptional } from '../error/validation.error';
import { uploadImage, uploadVideo } from "../utils/imagekit.util";
import { detectMimeType } from "../utils/checkmime.util";
import { createYappin } from "../services/yappin.service";

const YappingRoute = new Elysia()
    .use(isAuthenticated)
    .get("/yapping", async ( { body }) => {
        try {

            const page = 1; 
            const limit = 10;
            
            const result = await prisma.yappins.findMany({
                where: {
                    is_public: true,
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
                    is_public: true,
                    created_at: true,
                    users: {
                        select: {
                            username: true,
                            avatar_link: true
                        }
                    }
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
        ...getPublicYappinsAPIdoc as object
    })

    .get("/my-yapping", async ({ user }: { user: { id: string; name: string, exp : number } }) => {
        try {

            console.log(user)

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
            let tag_one_id = Number(body.tag_one_id) 
            let tag_two_id =  Number(body.tag_two_id) 
            let tag_three_id =  Number(body.tag_three_id) 
            let tag_four_id =  Number(body.tag_four_id) 

            if(typeof tag_one_id !== 'number' || typeof tag_two_id !== 'number' || typeof tag_three_id !== 'number' || typeof tag_four_id !== 'number'){
                throw new BadRequest("tag id must be a number")
            }

            let is_public;
            switch (body.is_public) {
                case '1':
                    is_public = true;
                    break; 
                default:
                    is_public = false;
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

                const uploadResponse = await uploadImage(mediaBuffer, user.username + String(new Date())); 

                const yappin = await createYappin(is_public, tag_one_id, tag_two_id, tag_three_id, tag_four_id, user, body)
        
                await prisma.yappin_image.create({
                    data: {
                        yappin_id: yappin.id,
                        image_link: uploadResponse.url
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
                    throw new BadRequest("image does not meet our policy")
                }

                const uploadResponse = await uploadVideo(mediaBuffer, user.username + String(new Date())); 

                const yappin = await createYappin(is_public, tag_one_id, tag_two_id, tag_three_id, tag_four_id, user, body)
        
                await prisma.yappin_image.create({
                    data: {
                        yappin_id: yappin.id,
                        image_link: uploadResponse.url
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
        ...getPublicYappinsAPIdoc as object,

        body : t.Object({
            image: t.File({
                type : ['image/jpeg', 'image/png', 'image/webp'],
                error( { errors }) {
                    console.log(errors)
                    if (errors[0].type == 31){
                        throw new InvalidData(`property image is required !`)
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
            tag_one_id: t.String({
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
            tag_one_name: t.String({
                required: true,
                example: "Ball",
                minLength: 1,
                maxLength: 20,
                error( { errors, validator, type, value }){
                    stringValidation("tag_one_name", 1, 20, errors)
                }
                
            }),
            tag_two_id: t.Optional(t.String({
                required: true,
                example: "1",
                minLength: 1,
                maxLength: 4,
                error( { errors, validator, type, value }){
                    stringValidationOptional("tag_two_id", 1, 4, errors)
                }  
            })),
            tag_two_name: t.Optional(t.String(
                {
                    example: "Vlog",
                    minLength: 1,
                    maxLength: 20,
                    error( { errors, validator, type, value }){
                        stringValidationOptional("tag_two_name", 1, 20, errors)
                    }                    
                }
            )),
            tag_three_id: t.Optional(t.String({
                required: true,
                example: "1",
                minLength: 1,
                maxLength: 4,
                error( { errors, validator, type, value }){
                    stringValidationOptional("tag_three_id", 1, 4, errors)
                }  
            })),
            tag_three_name: t.Optional(t.String(
                {
                    example: "Outdoor",
                    minLength: 1,
                    maxLength: 20,
                    error( { errors, validator, type, value }){
                        stringValidationOptional("tag_three_name", 1, 20, errors)
                    }
                    
                }
            )),
            tag_four_id: t.Optional(t.String({
                required: true,
                example: "1",
                minLength: 1,
                maxLength: 4,
                error( { errors, validator, type, value }){
                    stringValidationOptional("tag_four_id", 1, 4, errors)
                }  
            })),
            tag_four_name: t.Optional(t.String(
                {
                    example: "Fun",
                    minLength: 1,
                    maxLength: 20,
                    error( { errors, validator, type, value }){
                        stringValidationOptional("tag_four_name", 1, 20, errors)
                    }
                    
                }
            )),
          })

    })


export default YappingRoute