import mongoose from "mongoose";

const WordSchema = new mongoose.Schema({
    word: String,
    wordNumber: Number
})

const FundleWord = mongoose.model('FundleWords', WordSchema);

export default FundleWord;