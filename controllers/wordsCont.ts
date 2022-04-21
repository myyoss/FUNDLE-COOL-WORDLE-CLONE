import FundleWord from "../model/wordsModel"
import jwt from "jwt-simple";

const secret: any = process.env.JWT_SECRET;

const dictionary = require('../dictionary.json');

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
