export const postMyReminderAPIdoc = {

    detail: {
        summary: "Post reminder as signed-in user",
        tags: ["Reminders"],
        description: "Creates a new reminders",
        responses: {
          200: {
            description: "Reminder created successfully",
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
                    }
                  }
                }
              }
            }
          },
          400: {
            description: "Invalid input data or content policy violation",
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
                      example: "Invalid inputy"
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
                    error: {
                      type: "string",
                      description: "Error message",
                      example: "Bearer token missing or invalid"
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
                    error: {
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