import Elysia, { t } from "elysia";
import { prisma } from "../libs";
import { isAuthenticated } from "../middlewares/isAuthenticated.middleware";
import { stringValidation } from '../error/validation.error';
import { searchReferenceAPIdoc, searchUsersAPIdoc } from '../docs/search.doc';

const SearchReferenceRoute = new Elysia()
    .use(isAuthenticated)
    .get("/search-reference", async ({ query }) => {
        try {
            const { reference } = query;

            console.log(reference)

            if (!reference) {
                return {
                    status: false,
                    message: "reference's tag query is required"
                };
            }

            const page = 1; 
            const limit = 10;

            const result = await prisma.list_preference.findMany({
                where: {
                    name: {
                        contains: reference,
                        mode: 'insensitive' 
                    }
                },
                skip: (page - 1) * limit,
                take: limit, 
                orderBy: {
                    name: 'desc',
                },
            });

            if (result.length === 0) {
                return {
                    status: false,
                    message: "No reference found"
                };
            }

            return {
                status: true,
                message: "Success",
                data: result
            };
        } catch (err) {
            throw err
        }
    }, {
        query: t.Object({
            reference: t.String() 
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

        ...searchReferenceAPIdoc as object
    });

export default SearchReferenceRoute;
