import express from 'express';
import mongoose from "mongoose";
require('dotenv').config() //===> insert high as possible, before routs
const router = express.Router();


import { addUser, getUser, updateUser, loadUser, getOutUser, loadAllUsers } from "./controllers/usersCont"
// import router from './routes/userRoutes';
    // .get('/get-user', isAdmin, getUser)
    router.get('/get-user', getUser)
    router.get('/get-out-user', getOutUser)
    router.get('/load-all-users', loadAllUsers)
    router.get('/load-user', loadUser)
    router.post('/add-user', addUser)
    router.patch('/update-user', updateUser)



import userRoutes from "./routes/userRoutes"
import wordRoutes from "./routes/wordRoutes"

// var express = require('express');

// const routes = require('./routes')
// const userRoutes = require("./routes/userRoutes")
// const wordRoutes = require("./routes/wordRoutes")

console.log(process.env.ENV)

const cookieParser = require('cookie-parser')

const app = express();
const port = process.env.PORT || 3005;
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());

app.use('/users', userRoutes)
app.use('/words', wordRoutes)


const uri:any = process.env.MONGODB_URI;
mongoose.connect(uri);


app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});


