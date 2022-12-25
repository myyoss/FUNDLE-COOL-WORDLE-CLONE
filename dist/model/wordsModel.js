"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const WordSchema = new mongoose_1.default.Schema({
    word: String,
    wordNumber: Number
});
const FundleWord = mongoose_1.default.model('FundleWords', WordSchema);
exports.default = FundleWord;
//# sourceMappingURL=wordsModel.js.map