import userRoutes from "./userRoutes"
import wordRoutes from "./wordRoutes"
import express from 'express';
import mongoose from "mongoose";
require('dotenv').config() //===> insert high as possible, before routs




console.log(process.env.ENV)

const cookieParser = require('cookie-parser')

const app = express();
app.use('/users', userRoutes)
app.use('/words', wordRoutes)
const port = process.env.PORT || 3005;
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());



const uri:any = process.env.MONGODB_URI;
mongoose.connect(uri);


app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});


