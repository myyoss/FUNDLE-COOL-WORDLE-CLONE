"use strict";
exports.__esModule = true;
var express_1 = require("express");
var mongoose_1 = require("mongoose");
require('dotenv').config(); //===> insert high as possible, before routs
var userRoutes_1 = require("./routes/userRoutes");
var wordRoutes_1 = require("./routes/wordRoutes");
console.log(process.env.ENV);
var cookieParser = require('cookie-parser');
var app = express_1["default"]();
var port = process.env.PORT || 3004;
app.use(express_1["default"].static("public"));
app.use(express_1["default"].json());
app.use(cookieParser());
app.use('/users', userRoutes_1["default"]);
app.use('/words', wordRoutes_1["default"]);
// mongoose.connect('mongodb+srv://asnafy:ZyTcRnGlhXYqaYjE@cluster0.xgv3d.mongodb.net/fundle?retryWrites=true&w=majority');
var uri = process.env.MONGODB_URI;
mongoose_1["default"].connect(uri);
app.listen(port, function () {
    return console.log("Express is listening at http://localhost:" + port);
});
