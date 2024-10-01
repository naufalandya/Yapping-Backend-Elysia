import { reminders } from "@prisma/client";
import { prisma } from "../libs";
import { Reminder } from '../types/types';

export const createReminder = async (
    is_public: boolean,
    user: { id: string; username: string; exp: number },
    body: Reminder
): Promise<reminders> => {

    console.log(user.id)
    
    try {
        const reminder = await prisma.reminders.create({
            data: {
                title: body.title,                          
                content: body.content,                      
                is_finished: body.is_finished || false,     
                started_date: body.started_date || new Date(), 
                // finished_date: body.finished_date,  
                deadline_date: body.deadline_date,          
                created_date: new Date(),                  
                is_public: is_public,                       
                location: body.location || "",               
                user_id: Number(user.id),                 
            },
        });

        return reminder;
        
    } catch (err) {
        throw err;
    }
};
