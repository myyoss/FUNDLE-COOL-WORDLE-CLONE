"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.wordExists = exports.getDailyWord = exports.addToDB = void 0;
const wordsModel_1 = __importDefault(require("../model/wordsModel"));
const jwt_simple_1 = __importDefault(require("jwt-simple"));
const secret = process.env.JWT_SECRET;
const dictionary = require('../dictionary.json');
function shuffleDictionary(dictionary) {
    for (let i = 0; i < dictionary.length; i++) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = dictionary[i];
        dictionary[i] = dictionary[j];
        dictionary[j] = temp;
    }
}
shuffleDictionary(dictionary);
function addToDB() {
    return __awaiter(this, void 0, void 0, function* () {
        const dictionaryTest = yield wordsModel_1.default.find({ wordNumber: 1 });
        if (dictionaryTest.length > 0) {
            console.log('ok');
            console.log(dictionary.length);
        }
        else {
            console.log('null');
            for (let i = 0; i < dictionary.length; i++) {
                const newWord = new wordsModel_1.default({ word: dictionary[i], wordNumber: i });
                const result = yield newWord.save();
                console.log(i);
            }
        }
    });
}
exports.addToDB = addToDB;
function getDailyWord(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let { dayOffset } = req.query;
        const dailyWord = yield wordsModel_1.default.find({ wordNumber: dayOffset });
        const targetWord = dailyWord[0].word;
        const payload = { targetWord };
        const token = jwt_simple_1.default.encode(payload, secret);
        res.cookie("wordInfo", token, dailyWord[0].word, { httpOnly: true }, console.log('word is (from cookie):' + targetWord));
        res.send(dailyWord);
    });
}
exports.getDailyWord = getDailyWord;
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
function wordExists(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { guess } = req.query;
        const wordCheck = yield wordsModel_1.default.find({ word: guess });
        if (wordCheck[0]) {
            res.send({ found: true });
        }
        else {
            res.send({ found: false });
        }
    });
}
exports.wordExists = wordExists;
//# sourceMappingURL=wordsCont.js.map