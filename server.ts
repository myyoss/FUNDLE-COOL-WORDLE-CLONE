import express from 'express';
import mongoose from "mongoose";
require('dotenv').config() //===> insert high as possible, before routs
import userRoutes from "./routes/userRoutes"
import wordRoutes from "./routes/wordRoutes"

const router = express.Router();

import { addUser, getUser, updateUser, loadUser, getOutUser, loadAllUsers } from "./controllers/usersCont"
router
    // .get('/get-user', isAdmin, getUser)
    .get('/get-user', getUser)
    .get('/get-out-user', getOutUser)
    .get('/load-all-users', loadAllUsers)
    .get('/load-user', loadUser)
    .post('/add-user', addUser)
    .patch('/update-user', updateUser)

    import {addToDB, getDailyWord, wordExists} from "./controllers/wordsCont"


    router
    .get('/get-word', getDailyWord)
    .get('/get-guessCheck', wordExists)
    
    addToDB()

console.log(process.env.ENV)

const cookieParser = require('cookie-parser')

const app = express();
const port = process.env.PORT || 3004;
app.use(express.static("public"));
app.use(express.json()); 
app.use(cookieParser());

app.use('/users', userRoutes)
app.use('/words', wordRoutes)


// mongoose.connect('mongodb+srv://asnafy:ZyTcRnGlhXYqaYjE@cluster0.xgv3d.mongodb.net/fundle?retryWrites=true&w=majority');
// MONGODB_URI=mongodb+srv://michaeldubovik:michaeldubovik1991@cluster0.y9ozg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

const uri:any = process.env.MONGODB_URI;
mongoose.connect(uri);


app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});


