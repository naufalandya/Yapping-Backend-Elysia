export const singinAPIdoc = {

    detail : {
        summary : "Sign in user",
        tags : ['Authentication'],
        description : "authenticate registered user with email and password",
        responses : {
            200 : {
                description : "successfully signin up new user",
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
                                data : {
                                    type : "object",
                                    properties: {
                                        token : {
                                            type : "string",
                                            example : "eyJhbGciOiJIUzUxMiJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJuYXVmYWxhbmR5YXdha3dhdzEzNjciLCJleHAiOjE3MjcxNjg0MDJ9.qZ48dy0LtIp19XcXLvETsE7TEzw4Yh6jj3v26YVzQG3lfD4wyBbDaBVXcy1srNF161U2XM1ouo2qxPo5YJBDSg" 
                                        },
                                    }
                                }
                            },
                        },
                    }
                },
            },

                        
            400 : {
                description : "bad request password is not match",
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
                                    example : "password is not match !"
                                },
                            },
                        },
                    }
                },
            },

            404 : {
                description : "inserted email does not exist",
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
                                    example : "email does not belong to any account ! !"
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


export const whoamiAPIdoc = {

    detail : {
        summary : "Check user's token",
        tags : ['Authentication'],
        description : "authenticate registered user with token",

    },

}