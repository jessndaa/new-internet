"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routing_1 = require("./routing");
exports.router = express_1.default.Router();
exports.router.post('/fetcher', routing_1.Simple.index);
exports.router.post('/wikipage', routing_1.Simple.wikipediaindex);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3JvdXRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHNEQUE4QjtBQUM5Qix1Q0FBbUM7QUFDdEIsUUFBQSxNQUFNLEdBQUcsaUJBQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUV2QyxjQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxnQkFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ3RDLGNBQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLGdCQUFNLENBQUMsY0FBYyxDQUFDLENBQUMifQ==