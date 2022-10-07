import express from 'express';
const router = express.Router();

import {addToDB, getDailyWord, wordExists} from "./controllers/wordsCont"


router
.get('/get-word', getDailyWord)
.get('/get-guessCheck', wordExists)

addToDB()

export default router;