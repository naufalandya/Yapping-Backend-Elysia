import { Elysia } from "elysia";
import { rateLimit } from 'elysia-rate-limit'
import { logger } from "@tqman/nice-logger";
import { cors } from '@elysiajs/cors'
import { staticPlugin } from '@elysiajs/static'
import authRoute from "./routes/auth.route";
import YappingRoute from "./routes/yapping.route";
import swagger from "@elysiajs/swagger";
import { ErrorNotFound, BadRequest, InvalidData, Conflict, UnAuthorized } from "./error/error.handler";
import SearchUserRoute from "./routes/search.route";
import SearchReferenceRoute from "./routes/reference.route";
import ReminderRoute from "./routes/reminder.route";
import UserRoute from "./routes/user.route";
import NewsRoute from "./routes/news.route";

// SETUP ORIGIN REQUEST & ENV

let ORIGIN_REQUEST
let ENV = Bun.env.ENVIRONMENT

if (ENV === "production") {
  ORIGIN_REQUEST = Bun.env.ORIGIN_REQUEST_PRODUCTION
} else if (ENV === "staging") {
  ORIGIN_REQUEST = Bun.env.ORIGIN_REQUEST_STAGING
} else {
  ORIGIN_REQUEST = Bun.env.ORIGIN_REQUEST_DEVELOPMENT
}

// INITIALIZE ELYSIA OBJECT

const app = new Elysia().error( { ErrorNotFound, BadRequest, InvalidData, Conflict, UnAuthorized } )
  .onAfterHandle(({ request, set }) => {
    // Only process CORS requests
    if (request.method !== "OPTIONS") return;

    const allowHeader = set.headers["Access-Control-Allow-Headers"];
    if (allowHeader === "*") {
      set.headers["Access-Control-Allow-Headers"] =
        request.headers.get("Access-Control-Request-Headers") ?? "";
    }
  })

  // USE ORIGIN CORS ALLOWING REQUEST FROM ANOTHER DOMAIN

  .use(cors(
    {
      origin : ['http://localhost:5173', 'http://localhost:5173/', 'localhost:5173', String(ORIGIN_REQUEST), "https://bw2nj1xt-3500.asse.devtunnels.ms", "http://103.196.155.16:5173/", "http://103.196.155.16:5173", "http://alobro.my.id", "http://alobro.my.id/", "http://bw2nj1xt-3500.asse.devtunnels.ms", "https://bw2nj1xt-5173.asse.devtunnels.ms", "https://bw2nj1xt-5173.asse.devtunnels.ms/", "bw2nj1xt-5173.asse.devtunnels.ms"],
    }
  ))

  // Rate Limiter, Protect Endpoint
  // .use(rateLimit(
  //   {
  //     errorResponse : "ups, limit reached ! 😭"
  //   }
  // ))
  .trace(async ({ onHandle }) => {
    onHandle(({ begin, onStop }) => {
    onStop(({ end }) => {
          console.log('handle took', end - begin, 'ms')
    })
    })
  })

  .onError( ( { code, set, error }) =>  {
    console.log(error)
    switch (code) {
    case 'ErrorNotFound':

        set.headers["content-type"] = "application/json;charset=utf-8"
        set.status = 404

        return error
    
    case 'NOT_FOUND':
        set.headers["content-type"] = "application/json;charset=utf-8"
        return  error
    
    case 'BadRequest':

        set.headers["content-type"] = "application/json;charset=utf-8"
        set.status = 400

        return {
        success : false, 
        error : error.message 
        }

    case 'INTERNAL_SERVER_ERROR':
        set.status = 500

        return {
            success : false, 
            error : "internal server error"
        }

    case 'InvalidData':
        set.headers["content-type"] = "application/json;charset=utf-8"
        set.status = 422

        return {
        success : false, 
        error : error.message 
    }

    case 'UnAuthorized':
        set.headers["content-type"] = "application/json;charset=utf-8"
        set.status = 401

        return {
        success : false, 
        error : error.message 
    }

    case 'Conflict':
        set.headers["content-type"] = "application/json;charset=utf-8"
        set.status = 409

        return {
        success : false, 
        error : error.message 
    }


    }

}

)

 // API documentation

 .use(swagger({
  exclude : ['/api-docs', '/', '/api-docs/json'],
  scalarConfig : {
  theme : 'none',
  metaData : {
      articleAuthor : ["Naufal Andya"],
      author : "Naufal Andya",
  }
  },
  swaggerOptions : {
  persistAuthorization : true
  },
  path : "/api-docs",
  documentation: {
      info: {
          title: 'Andya API Documentation',
          version: '1.0.0',
          description : "API for studying",
          contact : {
          email : "andyakuliah@tgmai.com",
          name : "Naufal Andya Faiz",
          url : "https://github.com/naufalandya"
          }
      },
      tags: [
      { name: 'Authentication', description: 'signin & signup feature' },
      ],
      components: {
      securitySchemes: {
          JwtAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
          }
      }
      },
      servers: [{ url: "http://localhost:3500" }]
  }
}))
  // SERVE STATIC FILE IN PUBLIC FOLDER

  .use(staticPlugin())


  // LOGGING AND MONITORING

  .use(logger({
    mode: "live", 
  }))

  //Example Endpoint

  .get("/", () => "Hello Yapper ! :)")

  // List of route to be used
  .use(authRoute)
  .use(NewsRoute)
  .use(UserRoute)
  .use(ReminderRoute)
  .use(YappingRoute)
  .use(SearchUserRoute)
  .use(SearchReferenceRoute)

  //Run App  

  .listen(3500);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
