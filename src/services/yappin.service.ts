import { yappins } from "@prisma/client";
import { prisma } from "../libs"
import { Yappins } from '../types/types';

export const createYappin = async (is_public : boolean, tag_one_id : number, tag_two_id : number, tag_three_id : number, tag_four_id : number, user: { id: string; username: string, exp : number }, body : Yappins)  : Promise<yappins> =>{
    try {
        const yappin = await prisma.yappins.create({
            data: {
                caption: body.caption,
                created_at: new Date(),
                user_id: Number(user.id),
                is_public: is_public || undefined,
                tag_one_id: tag_one_id,
                tag_one_name: body.tag_one_name,
                tag_two_id: tag_two_id || undefined,
                tag_two_name: body.tag_two_name || undefined,
                tag_three_id: tag_three_id || undefined,
                tag_three_name: body.tag_three_name || undefined,
                tag_four_id: tag_four_id || undefined,
                tag_four_name: body.tag_four_name || undefined,
                location: body.location || undefined
            },
        });

        return yappin
        
    } catch (err) {
        throw err
    }
}