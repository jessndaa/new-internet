"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var mssql_1 = require("mssql");
var serve = express_1.default();
var conf = {
    user: 'Dieudonné',
    database: 'testdb',
    server: 'TOSHIB'
};
serve.get('', function (req, res) {
    var pool = new mssql_1.ConnectionPool(conf);
    pool.connect().then(function (e) {
        var result = pool.query(templateObject_1 || (templateObject_1 = __makeTemplateObject(["select * from mytable where id"], ["select * from mytable where id"])));
        result.then(function (mess) {
            res.send(mess);
        });
    }).catch(function (err) {
        res.send(err);
    });
});
serve.listen(8000);
var templateObject_1;
