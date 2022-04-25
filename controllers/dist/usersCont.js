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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.updateUser = exports.addUser = exports.getOutUser = exports.getUser = exports.loadAllUsers = exports.loadUser = void 0;
var usersModel_1 = require("../model/usersModel");
var jwt_simple_1 = require("jwt-simple");
var secret = process.env.JWT_SECRET;
function loadUser(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var userInfo, decoded;
        return __generator(this, function (_a) {
            try {
                userInfo = req.cookies.userInfo;
                console.log('username:' + userInfo); // shows encoded userInfo when hide
                console.log('server data (showen when not encoded): ' + userInfo.username); //undefined .username when encoded (hide)
                decoded = jwt_simple_1["default"].decode(userInfo, secret);
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
            return [2 /*return*/];
        });
    });
}
exports.loadUser = loadUser;
function loadAllUsers(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var allUsers, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, usersModel_1["default"].find({})];
                case 1:
                    allUsers = _a.sent();
                    console.log('allUsers: ' + allUsers);
                    res.send(allUsers);
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    if (error_1 instanceof Error) { //<===in brackets to let TS know type is error
                        console.log("Error on loadUser", error_1.message);
                        res.send({ error: error_1.message });
                    }
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.loadAllUsers = loadAllUsers;
function getUser(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, username, password, userMatch, payload, token, noPass;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.query, username = _a.username, password = _a.password;
                    return [4 /*yield*/, usersModel_1["default"].find({ username: username, password: password })];
                case 1:
                    userMatch = _b.sent();
                    if (!(userMatch.length >= 1)) return [3 /*break*/, 2];
                    payload = { username: username };
                    token = jwt_simple_1["default"].encode(payload, secret);
                    res.cookie("userInfo", token, // jwt- adding 'token' to req.cookie
                    { username: username, httpOnly: true } ///httponly- so client cant touch cookies//can also set {maxage} (time to erase) 
                    );
                    res.send({ user: userMatch });
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, usersModel_1["default"].find({ username: username })];
                case 3:
                    noPass = _b.sent();
                    if (noPass.length >= 1) {
                        res.send({ msg: "nopass", user: noPass });
                    }
                    else {
                        res.send("nouser");
                    }
                    _b.label = 4;
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.getUser = getUser;
function getOutUser(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, username, password, userMatch, payload, token;
        return __generator(this, function (_b) {
            _a = req.query, username = _a.username, password = _a.password;
            userMatch = { username: 'Guest', password: '' };
            console.log(userMatch);
            if (userMatch) {
                payload = { username: username };
                token = jwt_simple_1["default"].encode(payload, secret);
                res.cookie("userInfo", token, // jwt- adding 'token' to req.cookie
                { username: username, httpOnly: true } ///httponly- so client cant touch cookies//can also set {maxage} (time to erase) 
                );
                res.send({ user: userMatch });
            }
            return [2 /*return*/];
        });
    });
}
exports.getOutUser = getOutUser;
function addUser(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, username, password, email, noPass, played, wins, current_streak, max_streak, oneattempt, twoattempts, threeattempts, fourattempts, fiveattempts, sixattempts, newFundleUser, result;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.body, username = _a.username, password = _a.password, email = _a.email;
                    return [4 /*yield*/, usersModel_1["default"].find({ username: username })];
                case 1:
                    noPass = _b.sent();
                    if (!(noPass.length === 0)) return [3 /*break*/, 3];
                    played = 0;
                    wins = 0;
                    current_streak = 0;
                    max_streak = 0;
                    oneattempt = 0;
                    twoattempts = 0;
                    threeattempts = 0;
                    fourattempts = 0;
                    fiveattempts = 0;
                    sixattempts = 0;
                    newFundleUser = new usersModel_1["default"]({ username: username, password: password, email: email, played: played, wins: wins, current_streak: current_streak, max_streak: max_streak, oneattempt: oneattempt, twoattempts: twoattempts, threeattempts: threeattempts, fourattempts: fourattempts, fiveattempts: fiveattempts, sixattempts: sixattempts });
                    return [4 /*yield*/, newFundleUser.save()];
                case 2:
                    result = _b.sent();
                    res.send({ result: result });
                    return [3 /*break*/, 4];
                case 3:
                    res.send('AlreadyUser');
                    _b.label = 4;
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.addUser = addUser;
function updateUser(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, win, attempts, username, user, updatedUser;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.body, win = _a.win, attempts = _a.attempts, username = _a.username;
                    return [4 /*yield*/, usersModel_1["default"].find({ username: username })];
                case 1:
                    user = _b.sent();
                    if (!user[0]) return [3 /*break*/, 3];
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
                    return [4 /*yield*/, usersModel_1["default"].updateOne({ username: username }, {
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
                        })];
                case 2:
                    updatedUser = _b.sent();
                    _b.label = 3;
                case 3:
                    res.send({ ok: true });
                    return [2 /*return*/];
            }
        });
    });
}
exports.updateUser = updateUser;
