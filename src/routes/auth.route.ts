import { Elysia, t } from "elysia";
import { signupHandler } from "../handlers/auth.handler";
import { BadRequest, InvalidData } from "../error/error.handler";
import { signupHook } from "../hook/auth.hook";

const authRoute = new Elysia( { prefix : '/auth'})
    .post("/signup", async ( { body }) => signupHandler(body as User), signupHook as object )
    .post("/signin", () => {}
    , {})

export default authRoute