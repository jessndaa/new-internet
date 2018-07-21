"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var serve = express_1.default();
serve.get('/home', function (req, res) {
    if (req.query.id)
        res.send(req.query.id);
    else
        res.send('yes...');
});
serve.listen(8000);
