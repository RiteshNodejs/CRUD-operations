import express  from "express";
const app= express();
import dotenv from 'dotenv'
dotenv.config()

import bodyparser from 'express';
import Route from './Router/Route.js'

app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());
import mongoose from 'mongoose'
import MESSAGES from "./helpers/messageHelper.js";
mongoose.connect(process.env.DB_CREDENTIALS).then(() => {
    console.log(MESSAGES.DB_SUCCESS)
}).catch((err) => {
    console.log(MESSAGES.DB_ERROR, err)
})
Route(app)
app.listen(process.env.PORT) //http port ko listen krta hai 
