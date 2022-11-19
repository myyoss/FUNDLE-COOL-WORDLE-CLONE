"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const wordRoutes_1 = __importDefault(require("./routes/wordRoutes"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
require('dotenv').config(); //===> insert high as possible, before routs
// import userRoutes from "./routes/userRoutes"
// import wordRoutes from "./routes/wordRoutes"
// console.log(process.env.ENV)
const cookieParser = require('cookie-parser');
const app = express_1.default();
const port = process.env.PORT || 3006;
app.use(express_1.default.static("public"));
app.use(express_1.default.json());
app.use(cookieParser());
app.use('/users', userRoutes_1.default);
app.use('/words', wordRoutes_1.default);
const uri = process.env.MONGODB_URI;
mongoose_1.default.connect(uri);
app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});
