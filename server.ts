import userRoutes from "./routes/userRoutes";
import wordRoutes from "./routes/wordRoutes";
import express from 'express';
import mongoose from "mongoose";
require('dotenv').config() //===> insert high as possible, before routs
// import userRoutes from "./routes/userRoutes"
// import wordRoutes from "./routes/wordRoutes"


// console.log(process.env.ENV)

const cookieParser = require('cookie-parser')

const app = express();
const port = process.env.PORT || 3006;
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


