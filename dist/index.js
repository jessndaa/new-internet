"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bodyParser = __importStar(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const path = __importStar(require("path"));
const router_1 = require("./router");
// const hash = "$2b$10$WW/7QGzkIqe9T5dQ6b4o0.bVBd4vRJ2jg4271A96xojuL3UYjSvhu";
// const hash2 = "$2b$10$CJL2kfMvvHkl9EGushhAjexpmDHUvYV27QWZmMWXVenmezSQDjnTC";
// console.log(Connector.comparePass("123456789", hash));
const app = express_1.default();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors_1.default());
app.use(express_1.default.static(path.join(__dirname, 'public')));
app.use('/api', router_1.router);
app.listen(process.env.PORT || 80, () => { });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsc0RBQThCO0FBQzlCLHdEQUEwQztBQUMxQyxnREFBd0I7QUFDeEIsMkNBQTZCO0FBQzdCLHFDQUFrQztBQUVsQywrRUFBK0U7QUFDL0UsZ0ZBQWdGO0FBQ2hGLHlEQUF5RDtBQUV6RCxNQUFNLEdBQUcsR0FBRyxpQkFBTyxFQUFFLENBQUM7QUFFdEIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBQyxDQUFDLENBQUMsQ0FBQztBQUNqRCxHQUFHLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0FBQzNCLEdBQUcsQ0FBQyxHQUFHLENBQUMsY0FBSSxFQUFFLENBQUMsQ0FBQztBQUNoQixHQUFHLENBQUMsR0FBRyxDQUFDLGlCQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUV2RCxHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxlQUFNLENBQUMsQ0FBQztBQUN4QixHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLEVBQUUsRUFBQyxHQUFFLEVBQUUsR0FBQyxDQUFDLENBQUMsQ0FBQyJ9