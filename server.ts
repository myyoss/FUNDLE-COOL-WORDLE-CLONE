import express from 'express';
import mongoose from "mongoose";
require('dotenv').config() //===> insert high as possible, before routs
import userroutes from "./routes/dist/userroutes"
import wordroutes from "./routes/dist/wordroutes"


// console.log(process.env.ENV)

const cookieParser = require('cookie-parser')

const app = express();
const port = process.env.PORT || 3006;
app.use(express.static("public"));
app.use(express.json()); 
app.use(cookieParser());

app.use('/users', userroutes) 
app.use('/words', wordroutes)


const uri:any = process.env.MONGODB_URI;
mongoose.connect(uri);


app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});


