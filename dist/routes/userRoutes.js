"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const usersCont_1 = require("../controllers/usersCont");
// import {isAdmin} from '../middleWear/isAdmin'
router
    // .get('/get-user', isAdmin, getUser)
    .get('/get-user', usersCont_1.getUser)
    .get('/get-out-user', usersCont_1.getOutUser)
    .get('/load-all-users', usersCont_1.loadAllUsers)
    .get('/load-user', usersCont_1.loadUser)
    .post('/add-user', usersCont_1.addUser)
    .patch('/update-user', usersCont_1.updateUser);
// .get('/get-user', isAdmin, getUser)
exports.default = router;
//# sourceMappingURL=userRoutes.js.map