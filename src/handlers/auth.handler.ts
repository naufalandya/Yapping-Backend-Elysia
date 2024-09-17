import { BadRequest, Conflict } from "../error/error.handler";
import { findUserByEmail, findUserByUsername, hashPassword, signupUser } from "../services/user.service";

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
