"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
require('dotenv').config(); //===> insert high as possible, before routs
const userroutes_1 = __importDefault(require("./routes/userroutes"));
const wordroutes_1 = __importDefault(require("./routes/wordroutes"));
// console.log(process.env.ENV)
const cookieParser = require('cookie-parser');
const app = express_1.default();
const port = process.env.PORT || 3006;
app.use(express_1.default.static("public"));
app.use(express_1.default.json());
app.use(cookieParser());
app.use('/users', userroutes_1.default);
app.use('/words', wordroutes_1.default);
const uri = process.env.MONGODB_URI;
mongoose_1.default.connect(uri);
app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});
