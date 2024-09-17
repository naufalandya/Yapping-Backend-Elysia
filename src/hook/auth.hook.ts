import { t } from "elysia"
import { InvalidData } from "../error/error.handler"

export const signupHook = {

    // Validation

    body: t.Object({
        name: t.String({
            required: true,
            example: "Naufal Andya Faiz",
            minLength: 8,
            maxLength: 25,
            error( { errors, validator, type, value }){
                if (errors[0].type == 45){
                    throw new InvalidData("property name is required !")
                }

                if (errors[0].type == 54){
                    throw new InvalidData("property name must be string !")
                }

                if (errors[0].type == 51){
                    throw new InvalidData("the length character should not above 25 !")
                }

                if (errors[0].type == 52){
                    throw new InvalidData("the length character should not below 8 !")
                }
            }
        }),
        username: t.String({
            required: true,
            example: "naufalandya",
            minLength: 3,
            maxLength: 25,
            
            error( { errors, validator, type, value }){
                if (errors[0].type == 45){
                    throw new InvalidData("property username is required !")
                }

                if (errors[0].type == 54){
                    throw new InvalidData("property username must be string !")
                }

                if (errors[0].type == 51){
                    throw new InvalidData("the length character should not above 25 !")
                }

                if (errors[0].type == 52){
                    throw new InvalidData("the length character should not below 3 !")
                }
            }
        }),
        email: t.String({
            format: 'email',
            required: true,
            example: "whatiwillbein1000days@gmail.com",
            minLength: 3,
            maxLength: 50,
            error( { errors, validator, type, value }){
                if (errors[0].type == 45){
                    throw new InvalidData("property email is required !")
                }

                if (errors[0].type == 50){
                    throw new InvalidData("email has invalid format !")
                }

                if (errors[0].type == 54){
                    throw new InvalidData("property email must be string !")
                }

                if (errors[0].type == 51){
                    throw new InvalidData("the length character should not above 50 !")
                }

                if (errors[0].type == 52){
                    throw new InvalidData("the length character should not below 3 !")
                }
            }
        }),
        password: t.String({
            required: true,
            example: "wakwakwaw90000",
            minLength: 9,
            maxLength: 256,
            error( { errors, validator, type, value }){
                if (errors[0].type == 45){
                    throw new InvalidData("property password is required !")
                }

                if (errors[0].type == 54){
                    throw new InvalidData("property password must be string !")
                }

                if (errors[0].type == 51){
                    throw new InvalidData("the length character should not above 255 !")
                }

                if (errors[0].type == 52){
                    throw new InvalidData("the length character should not below 9 !")
                }
            }
            
        })
    }),

    detail : {
        summary : "Sign up new user",
        tags : ['Authentication'],
        description : "sign up new user with username, email, name, password",
        responses : {
            201 : {
                description : "successfully signed up new user",
                content : {
                    "application/json" : {
                        schema : {
                            type: "object",
                            properties : {
                                status : {
                                    type : "boolean",
                                    example : true,
                                },
                                message : {
                                    type : "string",
                                    example : "success",
                                },
                            },
                        },
                    }
                },
            },

                        
            400 : {
                description : "bad request",
                content : {
                    "application/json" : {
                        schema : {
                            type: "object",
                            properties : {
                                status : {
                                    type : "boolean",
                                    example : false,
                                },
                                error : {
                                    type : "string",
                                    description : "error message",
                                    example : "Something went wrong during the signup process !"
                                },
                            },
                        },
                    }
                },
            },

            
            409 : {
                description : "error conflict resource already used",
                content : {
                    "application/json" : {
                        schema : {
                            type: "object",
                            properties : {
                                status : {
                                    type : "boolean",
                                    example : false,
                                },
                                error : {
                                    type : "string",
                                    description : "error message",
                                    example : "email is already used !"
                                },
                            },
                        },
                    }
                },
            },

            422 : {
                description : "error validation",
                content : {
                    "application/json" : {
                        schema : {
                            type: "object",
                            properties : {
                                status : {
                                    type : "boolean",
                                    example : false,
                                },
                                error : {
                                    type : "string",
                                    description : "error message",
                                    example : "property password must be string !"
                                },
                            },
                        },
                    }
                },
            },

            500 : {
                description : "internal server error happened",
                content : {
                    "application/json" : {
                        schema : {
                            type: "object",
                            properties : {
                                status : {
                                    type : "boolean",
                                    example : false,
                                },
                                error : {
                                    type : "string",
                                    description : "error message",
                                    example : "internal server error !"
                                },
                            },
                        },
                    }
                },
            }
        }
    },

    
}