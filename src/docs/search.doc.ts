export const searchUsersAPIdoc = {
    detail: {
        summary: "Search for users by partial username",
        tags: ["Users"],
        description: "Fetches a list of users whose username contains the provided query string. The request requires authentication using a Bearer token and returns only the username and avatar link of the matching users.",
        responses: {
            200: {
                description: "Users found successfully",
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
                                            username: {
                                                type: "string",
                                                example: "john_doe"
                                            },
                                            avatar_link: {
                                                type: "string",
                                                example: "https://example.com/avatar.jpg"
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
                description: "Missing or invalid query parameters",
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                status: {
                                    type: "boolean",
                                    example: false
                                },
                                message: {
                                    type: "string",
                                    description: "Error message",
                                    example: "Username query is required"
                                }
                            }
                        }
                    }
                }
            },
            401: {
                description: "Unauthorized - Bearer token missing or invalid",
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                status: {
                                    type: "boolean",
                                    example: false
                                },
                                message: {
                                    type: "string",
                                    description: "Error message",
                                    example: "Bearer token missing or invalid"
                                }
                            }
                        }
                    }
                }
            },
            404: {
                description: "No users found",
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                status: {
                                    type: "boolean",
                                    example: false
                                },
                                message: {
                                    type: "string",
                                    description: "Error message",
                                    example: "No users found"
                                }
                            }
                        }
                    }
                }
            },
            500: {
                description: "Internal server error",
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                status: {
                                    type: "boolean",
                                    example: false
                                },
                                message: {
                                    type: "string",
                                    description: "Error message",
                                    example: "An unexpected error occurred"
                                }
                            }
                        }
                    }
                }
            }
        }
    }
};

export const searchReferenceAPIdoc = {
    detail: {
        summary: "Search for reference tag by partial",
        tags: ["Reference"],
        description: "Fetches a list of users whose tag contains the provided query string. The request requires authentication using a Bearer token and returns only the tag's reference",
        responses: {
            200: {
                description: "Tag found successfully",
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
                                                type: "number",
                                                example: 1
                                            },
                                            name: {
                                                type: "string",
                                                example: "Vlog"
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
                description: "Missing or invalid query parameters",
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                status: {
                                    type: "boolean",
                                    example: false
                                },
                                message: {
                                    type: "string",
                                    description: "Error message",
                                    example: "Username query is required"
                                }
                            }
                        }
                    }
                }
            },
            401: {
                description: "Unauthorized - Bearer token missing or invalid",
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                status: {
                                    type: "boolean",
                                    example: false
                                },
                                message: {
                                    type: "string",
                                    description: "Error message",
                                    example: "Bearer token missing or invalid"
                                }
                            }
                        }
                    }
                }
            },
            404: {
                description: "No users found",
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                status: {
                                    type: "boolean",
                                    example: false
                                },
                                message: {
                                    type: "string",
                                    description: "Error message",
                                    example: "No users found"
                                }
                            }
                        }
                    }
                }
            },
            500: {
                description: "Internal server error",
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                status: {
                                    type: "boolean",
                                    example: false
                                },
                                message: {
                                    type: "string",
                                    description: "Error message",
                                    example: "An unexpected error occurred"
                                }
                            }
                        }
                    }
                }
            }
        }
    }
};
