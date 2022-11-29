import express  from "express";
const app= express();

import bodyparser from 'express';
import Route from './Router/Route.js'

app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());

import mongoose from 'mongoose'
mongoose.connect('mongodb://localhost:27017/loginuser').then(() => {
    console.log('mongoose is connected')
}).catch((err) => {
    console.log("cant connect to database", err)
})
Route(app)

app.listen(3000)