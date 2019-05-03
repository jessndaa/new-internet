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
const router_1 = require("./router");
const firebase_admin_1 = require("firebase-admin");
// const hash = "$2b$10$WW/7QGzkIqe9T5dQ6b4o0.bVBd4vRJ2jg4271A96xojuL3UYjSvhu";
// const hash2 = "$2b$10$CJL2kfMvvHkl9EGushhAjexpmDHUvYV27QWZmMWXVenmezSQDjnTC";
// console.log(Connector.comparePass("123456789", hash));
firebase_admin_1.initializeApp({
    credential: firebase_admin_1.credential.cert(require('../public/small-talk-1b8d3-4376ff1cb8f9.json'))
});
var fs = firebase_admin_1.firestore();
const settings = { /* your settings... */ timestampsInSnapshots: true };
fs.settings(settings);
const app = express_1.default();
try {
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(cors_1.default());
    app.use('/api', router_1.router);
}
catch (error) {
}
// TODO : dev mode
// A utiliser pour changer le port
// app.listen(process.env.PORT || 4000,()=>{});
// TODO : prod mode
app.listen(process.env.PORT || 80, () => { });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsc0RBQThCO0FBQzlCLHdEQUEwQztBQUMxQyxnREFBd0I7QUFFeEIscUNBQWtDO0FBRWxDLG1EQUFzRTtBQUN0RSwrRUFBK0U7QUFDL0UsZ0ZBQWdGO0FBQ2hGLHlEQUF5RDtBQUN6RCw4QkFBYSxDQUFDO0lBQ1YsVUFBVSxFQUFFLDJCQUFVLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyw4Q0FBOEMsQ0FBQyxDQUFDO0NBQ3ZGLENBQUMsQ0FBQztBQUNILElBQUksRUFBRSxHQUFHLDBCQUFTLEVBQUUsQ0FBQztBQUNyQixNQUFNLFFBQVEsR0FBRyxFQUFDLHNCQUFzQixDQUFDLHFCQUFxQixFQUFFLElBQUksRUFBQyxDQUFDO0FBQ3RFLEVBQUUsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDdEIsTUFBTSxHQUFHLEdBQUcsaUJBQU8sRUFBRSxDQUFDO0FBQ3RCLElBQUk7SUFDQSxHQUFHLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2pELEdBQUcsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7SUFDM0IsR0FBRyxDQUFDLEdBQUcsQ0FBQyxjQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQ2hCLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLGVBQU0sQ0FBQyxDQUFDO0NBQzNCO0FBQUMsT0FBTyxLQUFLLEVBQUU7Q0FFZjtBQUdELGtCQUFrQjtBQUNsQixrQ0FBa0M7QUFDbEMsK0NBQStDO0FBRS9DLG1CQUFtQjtBQUNuQixHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLEVBQUUsRUFBQyxHQUFFLEVBQUUsR0FBQyxDQUFDLENBQUMsQ0FBQyJ9