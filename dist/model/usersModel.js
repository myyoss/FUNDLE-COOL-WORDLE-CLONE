"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const UserSchema = new mongoose_1.default.Schema({
    username: String,
    password: String,
    email: String,
    played: Number,
    wins: Number,
    current_streak: Number,
    max_streak: Number,
    oneattempt: Number,
    twoattempts: Number,
    threeattempts: Number,
    fourattempts: Number,
    fiveattempts: Number,
    sixattempts: Number
});
const FundleUser = mongoose_1.default.model('FundleUsers', UserSchema);
exports.default = FundleUser;
//# sourceMappingURL=usersModel.js.map