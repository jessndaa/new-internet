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
    credential: firebase_admin_1.credential.cert(require('../public/small-talk-1b8d3-4376ff1cb8f9.json')),
    databaseURL: "https://small-talk-1b8d3.firebaseio.com"
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsc0RBQThCO0FBQzlCLHdEQUEwQztBQUMxQyxnREFBd0I7QUFFeEIscUNBQWtDO0FBRWxDLG1EQUFzRTtBQUN0RSwrRUFBK0U7QUFDL0UsZ0ZBQWdGO0FBQ2hGLHlEQUF5RDtBQUN6RCw4QkFBYSxDQUFDO0lBQ1YsVUFBVSxFQUFFLDJCQUFVLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyw4Q0FBOEMsQ0FBQyxDQUFDO0lBQ3BGLFdBQVcsRUFBRSx5Q0FBeUM7Q0FDekQsQ0FBQyxDQUFDO0FBQ0gsSUFBSSxFQUFFLEdBQUcsMEJBQVMsRUFBRSxDQUFDO0FBQ3JCLE1BQU0sUUFBUSxHQUFHLEVBQUMsc0JBQXNCLENBQUMscUJBQXFCLEVBQUUsSUFBSSxFQUFDLENBQUM7QUFDdEUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUN0QixNQUFNLEdBQUcsR0FBRyxpQkFBTyxFQUFFLENBQUM7QUFDdEIsSUFBSTtJQUNBLEdBQUcsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDLENBQUM7SUFDakQsR0FBRyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUMzQixHQUFHLENBQUMsR0FBRyxDQUFDLGNBQUksRUFBRSxDQUFDLENBQUM7SUFDaEIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsZUFBTSxDQUFDLENBQUM7Q0FDM0I7QUFBQyxPQUFPLEtBQUssRUFBRTtDQUVmO0FBR0Qsa0JBQWtCO0FBQ2xCLGtDQUFrQztBQUNsQywrQ0FBK0M7QUFFL0MsbUJBQW1CO0FBQ25CLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksRUFBRSxFQUFDLEdBQUUsRUFBRSxHQUFDLENBQUMsQ0FBQyxDQUFDIn0=