/*-----
imports
-------*/

import express from "express";
import path from "path"
import { fileURLToPath } from "url"
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"
import mongoose from "mongoose";
import helmet from "helmet";

import { requestLogger } from "./middlewares/requestLogger.js";
import { errorHandler } from "./middlewares/errorHandler.js";

import authRouter from "./routers/authRouter.js"
import userRouter from "./routers/userRoutes.js"


/*------------
configurations
--------------*/

// Creates an Express application
const app = express();

// Load .env file contents into process.env 
dotenv.config()

const __filename = fileURLToPath(import.meta.url)
// note: __dirname related to server.js
export const __dirname = path.dirname(__filename)


/*---------
middlewares
-----------*/

// requests logger
app.use(requestLogger)

// set security HTTP headers
app.use(helmet());

// parse json and urlencoded in request body, and cookies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

// enable cors
var allowedOrigins = ['http://localhost:5173', 'http://127.0.0.1:5173'];
app.use(cors({
  origin: function(origin, callback){
    // allow requests with no origin (like mobile apps or curl requests)
    if(!origin) return callback(null, true);
    
    // allow requests from the allowed origins
    if(allowedOrigins.indexOf(origin) !== -1) return callback(null, true);

    return callback(new Error('Requests from this origin are prohibited'), false);  
  }, 
  credentials: true,
  // optionsSuccessStatus: 200,
}));


/*------------
Route Handlers
--------------*/

app.use('/auth', authRouter)

app.use('/user', userRouter)

// custom 404
app.use('*', (req, res) => {
  res.status(404).send('Sorry, page not found')
})

// errors handler
app.use(errorHandler)


/*--------------------
Listen for connections
----------------------*/

const port = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(conn => {
    console.log(`connected to ${conn.connection.name} db.`)
    app.listen(port, () => console.log(`Server listening on port ${port}.`));
  })
  .catch(err => console.log(err))
