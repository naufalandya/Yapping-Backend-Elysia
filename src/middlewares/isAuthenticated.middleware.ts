import bearer from "@elysiajs/bearer";
import jwt from "@elysiajs/jwt";
import Elysia, { t } from "elysia";
import { prisma } from "../libs";
import { ErrorNotFound, UnAuthorized } from "../error/error.handler";

export const isAuthenticated = (app: Elysia) =>
    app
    .use(bearer())
    .use(
        jwt({
            name: 'jwt',
            secret: Bun.env.JWT_SECRET as string,
            schema: t.Object({
                id: t.String(),
                username : t.String(),
                preference_one : t.String(),
                preference_two : t.String(),
                preference_three : t.String(),
                preference_four : t.String(),
                exp : t.Number() ,

            }),
            exp: '7d',
            alg : 'HS512',

         })
        )
    .derive( async ({ bearer, jwt, set }) => {

        return {
            user : await jwt.verify(bearer),
            set : set
        }

    })
    .onBeforeHandle ( async ({ user }) => {

        console.log("lol")

        if(!user) {
            throw new UnAuthorized("Unauthorized")
        }

        // const result = await prisma.users.findUnique({
        //     where : {
        //         id : Number(user.id)
        //     }
        // })

        // if(!result){
        //     throw new ErrorNotFound("Invalid user")
        // }
    })