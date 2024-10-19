import { NotFoundError } from "elysia";
import { BadRequest, Conflict } from "../error/error.handler";
import { findUserByEmail, findUserByUsername, hashPassword, matchPassword, signupUser } from "../services/user.service";
import { prisma } from "../libs";

export const signupHandler = async (body: User) => {
    try {
        const [email, username] = await Promise.all([
            findUserByEmail(body.email),
            findUserByUsername(body.username)
        ]);

        if (email) {
            throw new Conflict("Email is already used");
        }

        if (username) {
            throw new Conflict("Username is already used");
        }

        const hashedPassword = await hashPassword(body.password);

        if (typeof hashedPassword === "undefined") {
            throw new BadRequest("Something went wrong during the signup process !");
        }

        await signupUser(body.name, body.username, body.email, hashedPassword);

        return {
            status: true,
            message: "Success"
        };
    } catch (err) {
        throw err;
    }
};

export const signinHandler = async (body : User) => {
    try {
        const email = await findUserByEmail(body.email)

        if (!email) {
            throw new NotFoundError("email does not belong to any account !");
        }

        const password = await matchPassword(body.password, email.password)

        if (!password) {
            throw new BadRequest("password does not match !");
        }

        const preference = await prisma.preference_yappin.findUnique({
            where : {
                user_id : email.id
            }
        })

        return { 
            id : email.id, 
            username : email.username, 
            preference_one : preference?.preference_tag_one || " ", 
            preference_two : preference?.preference_tag_two || " ",
            preference_three : preference?.preference_tag_three || " ",
            preference_four : preference?.preference_tag_four || " "  
        }

    } catch(err) {
        throw err
    }
}
