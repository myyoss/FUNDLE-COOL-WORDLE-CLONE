"use strict";
exports.__esModule = true;
var express_1 = require("express");
var router = express_1["default"].Router();
var wordsCont_1 = require("../controllers/wordsCont");
router
    .get('/get-word', wordsCont_1.getDailyWord)
    .get('/get-guessCheck', wordsCont_1.wordExists);
wordsCont_1.addToDB();
exports["default"] = router;
