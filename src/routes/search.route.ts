import Elysia, { t } from "elysia";
import { prisma } from "../libs";
import { isAuthenticated } from "../middlewares/isAuthenticated.middleware";
import { stringValidation } from '../error/validation.error';
import { searchUsersAPIdoc } from '../docs/search.doc';

const SearchUserRoute = new Elysia()
    .use(isAuthenticated)
    .get("/search-users", async ({ query }) => {
        try {
            const { username } = query;

            console.log(username)

            if (!username) {
                return {
                    status: false,
                    message: "Username query is required"
                };
            }

            const users = await prisma.users.findMany({
                where: {
                    username: {
                        contains: username,
                        mode: 'insensitive' 
                    }
                },
                select: {
                    username: true,
                    avatar_link: true,
                }
            });

            if (users.length === 0) {
                return {
                    status: false,
                    message: "No users found"
                };
            }

            return {
                status: true,
                message: "Success",
                data: users
            };
        } catch (err) {
            throw err
        }
    }, {
        query: t.Object({
            username: t.String() 
        }),

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

        ...searchUsersAPIdoc as object
    });

export default SearchUserRoute;
