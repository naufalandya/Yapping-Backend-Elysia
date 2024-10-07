import { Elysia, t } from "elysia";
import { signinHandler, signupHandler } from "../handlers/auth.handler";
import { signinValidator, signupValidator } from "../validator/auth.validator";
import { jwt } from '@elysiajs/jwt';
import { singinAPIdoc, whoamiAPIdoc } from '../docs/auth.doc';
import { bearer } from '@elysiajs/bearer';

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
    .use(bearer())
    .post("/signup", async ( { body }) => signupHandler(body as User), signupValidator as object )
    .post("/signin", async ( { params, body, set, jwt }) => {
        
        const result = await signinHandler(body as User)

        const token = await jwt.sign(result)

        return {
            status : true,
            message : "success",
            data : {
                id : result.id,
                token : token
            }
        }

    }
    , { ...signinValidator as object, ...singinAPIdoc as object })
    .get("/who-am-i", () => {

    }, {

        ...whoamiAPIdoc as object,
        async beforeHandle({ bearer, jwt, set }) {
            if (!bearer) {
                set.status = 400
                set.headers[
                    'WWW-Authenticate'
                ] = `Bearer realm='sign', error="invalid_request"`

                return 'Unauthorized'
            }

            return {
                result : await jwt.verify(bearer)
            }
        },
    })

export default authRoute