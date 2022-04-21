"use strict";
exports.__esModule = true;
var express_1 = require("express");
var router = express_1["default"].Router();
var usersCont_1 = require("../controllers/usersCont");
// import {isAdmin} from '../middleWear/isAdmin'
router
    // .get('/get-user', isAdmin, getUser)
    .get('/get-user', usersCont_1.getUser)
    .get('/load-user', usersCont_1.loadUser)
    .post('/add-user', usersCont_1.addUser)
    .patch('/update-user', usersCont_1.updateUser);
exports["default"] = router;
