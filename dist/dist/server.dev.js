"use strict";

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var userRoutes_1 = __importDefault(require("../routes/userRoutes"));

var wordRoutes_1 = __importDefault(require("../routes/wordRoutes"));

var express_1 = __importDefault(require("express"));

var mongoose_1 = __importDefault(require("mongoose"));

require('dotenv').config(); //===> insert high as possible, before routs
// import userRoutes from "./routes/userRoutes"
// import wordRoutes from "./routes/wordRoutes"
// console.log(process.env.ENV)


var cookieParser = require('cookie-parser');

var app = express_1["default"]();
var port = process.env.PORT || 3006;
app.use(express_1["default"]["static"]("public"));
app.use(express_1["default"].json());
app.use(cookieParser());
app.use('/users', userRoutes_1["default"]);
app.use('/words', wordRoutes_1["default"]);
var uri = process.env.MONGODB_URI;
mongoose_1["default"].connect(uri);
app.listen(port, function () {
  return console.log("Express is listening at http://localhost:".concat(port));
});