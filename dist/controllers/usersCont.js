"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.addUser = exports.getOutUser = exports.getUser = exports.loadAllUsers = exports.loadUser = void 0;
const usersModel_1 = __importDefault(require("../model/usersModel"));
const jwt_simple_1 = __importDefault(require("jwt-simple"));
const secret = process.env.JWT_SECRET;
function loadUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { userInfo } = req.cookies;
            console.log('username:' + userInfo); // shows encoded userInfo when hide
            console.log('server data (showen when not encoded): ' + userInfo.username); //undefined .username when encoded (hide)
            const decoded = jwt_simple_1.default.decode(userInfo, secret);
            if (decoded) {
                res.send(decoded);
            }
            else {
                res.send('noLog');
            }
        }
        catch (error) {
            if (error instanceof Error) { //<===in brackets to let TS know type is error
                console.log("Error on loadUser", error.message);
                res.send({ error: error.message });
            }
        }
    });
}
exports.loadUser = loadUser;
function loadAllUsers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const allUsers = yield usersModel_1.default.find({});
            console.log('allUsers: ' + allUsers);
            res.send(allUsers);
        }
        catch (error) {
            if (error instanceof Error) { //<===in brackets to let TS know type is error
                console.log("Error on loadUser", error.message);
                res.send({ error: error.message });
            }
        }
    });
}
exports.loadAllUsers = loadAllUsers;
function getUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let { username, password } = req.query;
        const userMatch = yield usersModel_1.default.find({ username: username, password: password });
        if (userMatch.length >= 1) {
            const payload = { username };
            const token = jwt_simple_1.default.encode(payload, secret);
            res.cookie("userInfo", token, // jwt- adding 'token' to req.cookie
            { username, httpOnly: true } ///httponly- so client cant touch cookies//can also set {maxage} (time to erase) 
            );
            res.send({ user: userMatch });
        }
        else {
            const noPass = yield usersModel_1.default.find({ username: username });
            if (noPass.length >= 1) {
                res.send({ msg: "nopass", user: noPass });
            }
            else {
                res.send("nouser");
            }
        }
    });
}
exports.getUser = getUser;
function getOutUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let { username, password } = req.query;
        const userMatch = { username: 'Guest', password: '' };
        console.log(userMatch);
        if (userMatch) {
            const payload = { username };
            const token = jwt_simple_1.default.encode(payload, secret);
            res.cookie("userInfo", token, // jwt- adding 'token' to req.cookie
            { username, httpOnly: true } ///httponly- so client cant touch cookies//can also set {maxage} (time to erase) 
            );
            res.send({ user: userMatch });
        }
    });
}
exports.getOutUser = getOutUser;
function addUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let { username, password, email } = req.body;
        const noPass = yield usersModel_1.default.find({ username: username });
        if (noPass.length === 0) {
            let played = 0;
            let wins = 0;
            let current_streak = 0;
            let max_streak = 0;
            let oneattempt = 0;
            let twoattempts = 0;
            let threeattempts = 0;
            let fourattempts = 0;
            let fiveattempts = 0;
            let sixattempts = 0;
            const newFundleUser = new usersModel_1.default({ username, password, email, played, wins, current_streak, max_streak, oneattempt, twoattempts, threeattempts, fourattempts, fiveattempts, sixattempts });
            const result = yield newFundleUser.save();
            res.send({ result });
        }
        else {
            res.send('AlreadyUser');
        }
    });
}
exports.addUser = addUser;
function updateUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let { win, attempts, username } = req.body;
        const user = yield usersModel_1.default.find({ username: username });
        if (user[0]) {
            if (attempts === 1) {
                user[0].oneattempt++;
            }
            if (attempts === 2) {
                user[0].twoattempts++;
            }
            if (attempts === 3) {
                user[0].threeattempts++;
            }
            if (attempts === 4) {
                user[0].fourattempts++;
            }
            if (attempts === 5) {
                user[0].fiveattempts++;
            }
            if (attempts === 6) {
                user[0].sixattempts++;
            }
            user[0].played++;
            console.log('played: ' + user[0].played);
            console.log(win);
            if (win) {
                user[0].wins++;
                user[0].current_streak++;
                console.log(user[0].current_streak);
                if (user[0].current_streak > user[0].max_streak) {
                    user[0].max_streak = user[0].current_streak;
                }
            }
            else if (win === false) {
                user[0].current_streak = 0;
                user[0].sixattempts--;
            }
            const updatedUser = yield usersModel_1.default.updateOne({ username: username }, {
                played: user[0].played,
                wins: user[0].wins,
                current_streak: user[0].current_streak,
                max_streak: user[0].max_streak,
                oneattempt: user[0].oneattempt,
                twoattempts: user[0].twoattempts,
                threeattempts: user[0].threeattempts,
                fourattempts: user[0].fourattempts,
                fiveattempts: user[0].fiveattempts,
                sixattempts: user[0].sixattempts
            });
        }
        res.send({ ok: true });
    });
}
exports.updateUser = updateUser;
//# sourceMappingURL=usersCont.js.map