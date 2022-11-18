import FundleWord from "./model/wordsModel"
import express from 'express';
import mongoose from "mongoose";
require('dotenv').config() //===> insert high as possible, before routs
// import userRoutes from "./routes/userRoutes"
// import wordRoutes from "./routes/wordRoutes"


const router = express.Router();

// import { addUser, getUser, updateUser, loadUser, getOutUser, loadAllUsers } from "./controllers/usersCont"
router
// .get('/get-user', isAdmin, getUser)
.get('/get-user', getUser)
.get('/get-out-user', getOutUser)
.get('/load-all-users', loadAllUsers)
.get('/load-user', loadUser)
.post('/add-user', addUser)
.patch('/update-user', updateUser)

// import {addToDB, getDailyWord, wordExists} from "./controllers/wordsCont"


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

// const routes = require('./routes')
// app.use('/', routes);
// app.use('/users', userRoutes)
// app.use('/words', wordRoutes)


// mongoose.connect('mongodb+srv://asnafy:ZyTcRnGlhXYqaYjE@cluster0.xgv3d.mongodb.net/fundle?retryWrites=true&w=majority');
// MONGODB_URI=mongodb+srv://michaeldubovik:michaeldubovik1991@cluster0.y9ozg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

const uri:any = process.env.MONGODB_URI;
mongoose.connect(uri);


import FundleUser from "./model/usersModel"
import jwt from "jwt-simple";

const secret: any = process.env.JWT_SECRET;

export async function loadUser(req: any, res: any) {
    try {
        const { userInfo } = req.cookies;
        console.log('username:' +userInfo)// shows encoded userInfo when hide
        console.log('server data (showen when not encoded): ' + userInfo.username)//undefined .username when encoded (hide)

        const decoded: any = jwt.decode(userInfo, secret);

        if (decoded) {
            res.send(decoded)
        } else {
            res.send('noLog')
        }
    } catch (error) {

        if (error instanceof Error) {  //<===in brackets to let TS know type is error
            console.log("Error on loadUser", error.message);
            res.send({ error: error.message })
        }
    }
}

export async function loadAllUsers(req: any, res: any) {
    try {
        const allUsers = await FundleUser.find({});
        console.log('allUsers: ' + allUsers)
        res.send(allUsers)
    } catch (error) {

        if (error instanceof Error) {  //<===in brackets to let TS know type is error
            console.log("Error on loadUser", error.message);
            res.send({ error: error.message })
        }
    }
}




export async function getUser(req: any, res: any) {

    let { username, password } = req.query
    const userMatch = await FundleUser.find({ username: username, password: password })
    
    if (userMatch.length >= 1) {
        const payload = { username };
        const token = jwt.encode(payload, secret);
        res.cookie(
            "userInfo",
            token,// jwt- adding 'token' to req.cookie
            { username, httpOnly: true }///httponly- so client cant touch cookies//can also set {maxage} (time to erase) 
        );
        res.send({ user: userMatch })
    }
    else {
        const noPass = await FundleUser.find({ username: username })
        if (noPass.length >= 1) {
            res.send({ msg: "nopass", user: noPass })
        }
        else {
            res.send("nouser")
        }
    }
}

export async function getOutUser(req: any, res: any) {

    let { username, password } = req.query
    const userMatch = { username:'Guest', password:'' }
    console.log(userMatch)
    if (userMatch) {
        const payload = { username };
        const token = jwt.encode(payload, secret);
        res.cookie(
            "userInfo",
            token,// jwt- adding 'token' to req.cookie
            { username, httpOnly: true }///httponly- so client cant touch cookies//can also set {maxage} (time to erase) 
        );
        res.send({ user: userMatch })
    }
}


export async function addUser(req: any, res: any) {

    let { username, password, email } = req.body;

    const noPass = await FundleUser.find({ username: username })

    if (noPass.length === 0) {
        let played = 0;
        let wins = 0;
        let current_streak = 0;
        let max_streak = 0;
        let oneattempt = 0;
        let twoattempts = 0;
        let threeattempts = 0;
        let fourattempts = 0;
        let fiveattempts = 0;
        let sixattempts = 0;
        const newFundleUser = new FundleUser({ username, password, email, played, wins, current_streak, max_streak, oneattempt, twoattempts, threeattempts, fourattempts, fiveattempts, sixattempts })
        const result = await newFundleUser.save()
        res.send({ result });
    }

    else {
        res.send('AlreadyUser')
    }
}


export async function updateUser(req: any, res: any) {

    let { win, attempts, username } = req.body

    const user = await FundleUser.find({ username: username })

    if (user[0]) {

        if (attempts === 1) {
            user[0].oneattempt++;
        }
        if (attempts === 2) {
            user[0].twoattempts++;
        }
        if (attempts === 3) {
            user[0].threeattempts++;
        }
        if (attempts === 4) {
            user[0].fourattempts++;
        }
        if (attempts === 5) {
            user[0].fiveattempts++;
        }
        if (attempts === 6) {
            user[0].sixattempts++;
        }

        user[0].played++;

        console.log('played: ' + user[0].played)
        console.log(win)

        if (win) {
            user[0].wins++;
            user[0].current_streak++;
            console.log(user[0].current_streak)
            if (user[0].current_streak > user[0].max_streak) {
                user[0].max_streak = user[0].current_streak;
            }
        }

        else if (win === false) {
            user[0].current_streak = 0;
            user[0].sixattempts--;
        }

        const updatedUser = await FundleUser.updateOne(
            { username: username },
            {
                played: user[0].played,
                wins: user[0].wins,
                current_streak: user[0].current_streak,
                max_streak: user[0].max_streak,
                oneattempt: user[0].oneattempt,
                twoattempts: user[0].twoattempts,
                threeattempts: user[0].threeattempts,
                fourattempts: user[0].fourattempts,
                fiveattempts: user[0].fiveattempts,
                sixattempts: user[0].sixattempts
            })

    }

    res.send({ ok: true });
}


// import jwt from "jwt-simple";

// const secret: any = process.env.JWT_SECRET;

const dictionary = require('./dictionary.json');

function shuffleDictionary(dictionary: any) {
    for (let i = 0; i < dictionary.length; i++) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = dictionary[i];
        dictionary[i] = dictionary[j];
        dictionary[j] = temp;
    }
}

shuffleDictionary(dictionary)
export async function addToDB() {
    const dictionaryTest = await FundleWord.find({ wordNumber: 1 })
    if (dictionaryTest.length > 0) {
        console.log('ok')
        console.log(dictionary.length)
    }
    else {
        console.log('null')
        
        for (let i = 0; i < dictionary.length; i++) {
            const newWord = new FundleWord({ word: dictionary[i], wordNumber: i })
            const result = await newWord.save()
            console.log(i)
        }
    }
}

export async function getDailyWord(req: any, res: any) {
    let { dayOffset } = req.query;
    const dailyWord:any = await FundleWord.find({ wordNumber: dayOffset })

    const targetWord= dailyWord[0].word
    
    const payload = { targetWord };
    const token = jwt.encode(payload, secret);
    res.cookie(
                "wordInfo", token, dailyWord[0].word,
                {httpOnly: true },
                console.log('word is (from cookie):'  +targetWord)
    );
    
    res.send(dailyWord)
}

// export async function handleNewGame(req: any, res: any) {
//     let { dayOffset } = req.query;
//     const dailyWord:any = await FundleWord.find({ wordNumber: dayOffset++ })

//     const targetWord= dailyWord[0].word
    
//     const payload = { targetWord };
//     const token = jwt.encode(payload, secret);
//     res.cookie(
//                 "wordInfo", token, dailyWord[0].word,
//                 {httpOnly: true },
//                 console.log('word is (from newcookie):'  +targetWord)
//     );
    
//     res.send(dailyWord)
// }

export async function wordExists(req:any, res:any){
    const { guess } = req.query;
    const wordCheck = await FundleWord.find({word:guess})
    if (wordCheck[0]){
        res.send({found: true})
    }
    else{
        res.send({found: false})
    }
}

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});


