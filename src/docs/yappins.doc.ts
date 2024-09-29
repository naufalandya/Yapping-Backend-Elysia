export const getPublicYappinsAPIdoc = {

    detail: {
        summary: "Get public yappins with user details",
        tags: ['Yappins'],
        description: "Fetches a list of public yappins along with the associated user details (username and avatar). The results are paginated and sorted by creation date.",
        parameters: [
            {
                name: "page",
                in: "query",
                description: "The page number for pagination",
                required: false,
                schema: {
                    type: "integer",
                    example: 1
                }
            },
            {
                name: "limit",
                in: "query",
                description: "The number of items per page",
                required: false,
                schema: {
                    type: "integer",
                    example: 10
                }
            }
        ],
        responses: {
            200: {
                description: "Successfully fetched the list of public yappins",
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                status: {
                                    type: "boolean",
                                    example: true
                                },
                                message: {
                                    type: "string",
                                    example: "Success"
                                },
                                data: {
                                    type: "array",
                                    items: {
                                        type: "object",
                                        properties: {
                                            id: {
                                                type: "integer",
                                                example: 1
                                            },
                                            caption: {
                                                type: "string",
                                                example: "A beautiful day!"
                                            },
                                            total_likes: {
                                                type: "integer",
                                                example: 102
                                            },
                                            is_public: {
                                                type: "boolean",
                                                example: true
                                            },
                                            created_at: {
                                                type: "string",
                                                format: "date-time",
                                                example: "2024-09-26T14:48:00.000Z"
                                            },
                                            users: {
                                                type: "object",
                                                properties: {
                                                    username: {
                                                        type: "string",
                                                        example: "naufalandyawakd"
                                                    },
                                                    avatar_link: {
                                                        type: "string",
                                                        nullable: true,
                                                        example: "https://example.com/avatar.jpg"
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            400: {
                description: "Bad request due to invalid pagination parameters",
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                status: {
                                    type: "boolean",
                                    example: false
                                },
                                error: {
                                    type: "string",
                                    description: "Error message",
                                    example: "Invalid page or limit parameter"
                                }
                            }
                        }
                    }
                }
            },
            404: {
                description: "No public yappins found",
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                status: {
                                    type: "boolean",
                                    example: false
                                },
                                error: {
                                    type: "string",
                                    description: "Error message",
                                    example: "No public yappins found!"
                                }
                            }
                        }
                    }
                }
            }
        }
    }
};

export const getMyYappinsAPIdoc = {

    detail: {
        summary: "Get public yappins from signed in user",
        tags: ['Yappins'],
        description: "Fetches a list of yappins. The results are paginated and sorted by creation date.",
        parameters: [
            {
                name: "page",
                in: "query",
                description: "The page number for pagination",
                required: false,
                schema: {
                    type: "integer",
                    example: 1
                }
            },
            {
                name: "limit",
                in: "query",
                description: "The number of items per page",
                required: false,
                schema: {
                    type: "integer",
                    example: 10
                }
            }
        ],
        responses: {
            200: {
                description: "Successfully fetched the list of your yappins",
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                status: {
                                    type: "boolean",
                                    example: true
                                },
                                message: {
                                    type: "string",
                                    example: "Success"
                                },
                                data: {
                                    type: "array",
                                    items: {
                                        type: "object",
                                        properties: {
                                            id: {
                                                type: "integer",
                                                example: 1
                                            },
                                            caption: {
                                                type: "string",
                                                example: "A beautiful day!"
                                            },
                                            total_likes: {
                                                type: "integer",
                                                example: 102
                                            },
                                            is_public: {
                                                type: "boolean",
                                                example: true
                                            },
                                            created_at: {
                                                type: "string",
                                                format: "date-time",
                                                example: "2024-09-26T14:48:00.000Z"
                                            },
                                            users: {
                                                type: "object",
                                                properties: {
                                                    username: {
                                                        type: "string",
                                                        example: "naufalandyawakd"
                                                    },
                                                    avatar_link: {
                                                        type: "string",
                                                        nullable: true,
                                                        example: "https://example.com/avatar.jpg"
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            400: {
                description: "Bad request due to invalid pagination parameters",
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                status: {
                                    type: "boolean",
                                    example: false
                                },
                                error: {
                                    type: "string",
                                    description: "Error message",
                                    example: "Invalid page or limit parameter"
                                }
                            }
                        }
                    }
                }
            },
            404: {
                description: "No public yappins found",
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                status: {
                                    type: "boolean",
                                    example: false
                                },
                                error: {
                                    type: "string",
                                    description: "Error message",
                                    example: "No public yappins found!"
                                }
                            }
                        }
                    }
                }
            }
        }
    }
};