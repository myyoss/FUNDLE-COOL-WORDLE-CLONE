"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
require('dotenv').config(); //===> insert high as possible, before routs
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const wordRoutes_1 = __importDefault(require("./routes/wordRoutes"));
const router = express_1.default.Router();
const usersCont_1 = require("./controllers/usersCont");
router
    // .get('/get-user', isAdmin, getUser)
    .get('/get-user', usersCont_1.getUser)
    .get('/get-out-user', usersCont_1.getOutUser)
    .get('/load-all-users', usersCont_1.loadAllUsers)
    .get('/load-user', usersCont_1.loadUser)
    .post('/add-user', usersCont_1.addUser)
    .patch('/update-user', usersCont_1.updateUser);
const wordsCont_1 = require("./controllers/wordsCont");
router
    .get('/get-word', wordsCont_1.getDailyWord)
    .get('/get-guessCheck', wordsCont_1.wordExists);
wordsCont_1.addToDB();
console.log(process.env.ENV);
const cookieParser = require('cookie-parser');
const app = express_1.default();
const port = process.env.PORT || 3004;
app.use(express_1.default.static("public"));
app.use(express_1.default.json());
app.use(cookieParser());
app.use('/users', userRoutes_1.default);
app.use('/words', wordRoutes_1.default);
// mongoose.connect('mongodb+srv://asnafy:ZyTcRnGlhXYqaYjE@cluster0.xgv3d.mongodb.net/fundle?retryWrites=true&w=majority');
// MONGODB_URI=mongodb+srv://michaeldubovik:michaeldubovik1991@cluster0.y9ozg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
const uri = process.env.MONGODB_URI;
mongoose_1.default.connect(uri);
app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});
