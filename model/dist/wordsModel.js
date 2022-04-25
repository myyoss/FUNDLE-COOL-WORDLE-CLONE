"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var WordSchema = new mongoose_1["default"].Schema({
    word: String,
    wordNumber: Number
});
var FundleWord = mongoose_1["default"].model('FundleWords', WordSchema);
exports["default"] = FundleWord;
