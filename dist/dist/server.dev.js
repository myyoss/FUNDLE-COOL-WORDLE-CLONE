"use strict";

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var express_1 = __importDefault(require("express"));

var mongoose_1 = __importDefault(require("mongoose"));

require('dotenv').config(); //===> insert high as possible, before routs
// import userRoutes from "./routes/userRoutes"
// import wordRoutes from "./routes/wordRoutes"
// require('./routes/userRoutes')
// require('./routes/wordRoutes')


var config = require('./routes/userRoutes');

console.log(process.env.ENV);

var cookieParser = require('cookie-parser');

var userRoutes = require('./routes/userRoutes');

var wordRoutes = require('./routes/wordRoutes');

var app = express_1["default"]();
var port = process.env.PORT || 3004;
app.use(express_1["default"]["static"]("public"));
app.use(express_1["default"].json());
app.use(cookieParser());
app.use('/users', userRoutes);
app.use('/words', wordRoutes); // mongoose.connect('mongodb+srv://asnafy:ZyTcRnGlhXYqaYjE@cluster0.xgv3d.mongodb.net/fundle?retryWrites=true&w=majority');
// MONGODB_URI=mongodb+srv://michaeldubovik:michaeldubovik1991@cluster0.y9ozg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

var uri = process.env.MONGODB_URI;
mongoose_1["default"].connect(uri);
app.listen(port, function () {
  return console.log("Express is listening at http://localhost:".concat(port));
});