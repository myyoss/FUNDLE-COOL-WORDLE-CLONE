"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const wordsCont_1 = require("../controllers/wordsCont");
router
    .get('/get-word', wordsCont_1.getDailyWord)
    .get('/get-guessCheck', wordsCont_1.wordExists);
(0, wordsCont_1.addToDB)();
exports.default = router;
//# sourceMappingURL=wordRoutes.js.map