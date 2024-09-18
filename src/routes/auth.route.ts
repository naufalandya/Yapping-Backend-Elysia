import { Elysia, t } from "elysia";
import { signinHandler, signupHandler } from "../handlers/auth.handler";
import { signinValidator, signupValidator } from "../validator/auth.validator";
import { jwt } from '@elysiajs/jwt';
import { singinAPIdoc } from '../docs/auth.doc';

const authRoute = new Elysia( { prefix : '/auth'})
  // JWT configuration
    .use(
        jwt({
            name: 'jwt',
            secret: String(Bun.env.JWT_SECRET),
            exp: '7d',
            alg : 'HS512',
        })
    )
    .post("/signup", async ( { body }) => signupHandler(body as User), signupValidator as object )
    .post("/signin", async ( { params, body, set, jwt }) => {
        
        const result = await signinHandler(body as User)

        const token = await jwt.sign(result)

        return {
            status : true,
            message : "success",
            data : {
                token : token
            }
        }

    }
    , { ...signinValidator as object, ...singinAPIdoc as object })

export default authRoute