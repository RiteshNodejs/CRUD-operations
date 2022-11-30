import express  from "express";
const app= express();
import dotenv from 'dotenv'
dotenv.config()

import bodyparser from 'express';
import Route from './Router/Route.js'

app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());

import mongoose from 'mongoose'
mongoose.connect(process.env.DB_CREDENTIALS).then(() => {
    console.log('mongoose is connected')
}).catch((err) => {
    console.log("cant connect to database", err)
})
Route(app)
app.listen(process.env.PORT)
