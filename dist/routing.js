"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apiai = __importStar(require("apiai"));
const node_fetch_1 = __importDefault(require("node-fetch"));
const cheerio_1 = __importDefault(require("cheerio"));
var app = apiai.default("4fa7646395134bb8a2a59fa2f5f78f4a");
const firebase_admin_1 = require("firebase-admin");
const university_models_1 = require("./models/university.models");
class Simple {
    static async index(req, res) {
        var request = app.textRequest(req.body.message, {
            sessionId: req.body.phone
        });
        request.on('response', function (response) {
            res.end(response.result.fulfillment.speech);
        });
        request.on('error', function (error) {
            console.log(error);
        });
        request.end();
    }
    static async wikipediaindex(req, res) {
        let parameters = req.body.result.parameters;
        let intent = req.body.result.metadata.intentName;
        console.log("ooooops");
        try {
            switch (intent) {
                case "wiki.about.person":
                    Simple.fetchWikiPerson(req, res, parameters);
                    break;
                case "web.media.info":
                    Simple.fetchMediaCongo(req, res, parameters);
                    break;
                case "univ.info.day":
                    Simple.getInfoDay(req, res, parameters);
                    break;
                default:
                    res.end({
                        "speech": "Nous n'avons pas d'information sur votre recherche."
                    });
                    break;
            }
        }
        catch (error) {
            res.end({
                "speech": "Nous n'avons pas d'information sur votre recherche."
            });
        }
    }
    static fetchWikiPerson(req, res, parameters) {
        node_fetch_1.default("https://fr.wikipedia.org/w/api.php?format=json&utf8=&action=query&list=search&srsearch=" + parameters.any + "&srlimit=1")
            .then(function name(result) {
            return result.json();
        })
            .then(function name(body) {
            let wiki_res = body.query.search[0].snippet;
            wiki_res = wiki_res.replace("<span class=\"searchmatch\">", "").replace("</span>", "")
                .replace("<span class=\"searchmatch\">", "").replace("</span>", "")
                .replace("<span class=\"searchmatch\">", "").replace("</span>", "")
                .replace("<span class=\"searchmatch\">", "").replace("</span>", "")
                .replace("<span class=\"searchmatch\">", "").replace("</span>", "");
            let splitter = wiki_res.split(' ');
            if (splitter[splitter.length - 1] === "homme") {
                wiki_res += " politique";
            }
            res.json({
                "speech": "Sélon Wikipédia, " + wiki_res
            });
        })
            .catch(function name() {
            res.end({
                "speech": "Nous n'avons pas d'information sur votre recherche."
            });
        });
    }
    static async getInfoDay(req, res, parameters) {
        var fs = firebase_admin_1.firestore();
        req.body.sessionId = "+243820826571";
        var student = await fs.collection("student").where("phone", "==", req.body.sessionId).get();
        var std = new university_models_1.Student();
        student.forEach((value) => {
            std = value.data();
        });
        if (student.size < 1) {
            res.send({
                "speech": "Desolé mais je n'arrive pas à touver votre universite est votre promotion, svp veuillez m'indiquer votre université, votre promotion ainsi que, votre nom svp :)"
            });
            return;
        }
        var planing = await fs.collection("school-planing").where("promotiom", "==", std.promotion).get();
        var plan = new university_models_1.Planing();
        planing.forEach((val) => {
            plan = val.data();
        });
        var smsReverse = "J'ai trouvé que aujourd'hui il y a: ";
        if (plan.Adctivities.length < 1) {
            smsReverse = "J'ai pas trouvé d'information sur votre promotion pour journné d'aujourd'hui ";
            console.log(plan.Adctivities);
        }
        else {
            plan.Adctivities.forEach((value) => {
                smsReverse += value.Adctivities + ` à ${value.heure} : ${value.minute}, `;
            });
        }
        res.send({ "speech": smsReverse });
    }
    static fetchMediaCongo(req, res, parameters) {
        node_fetch_1.default("https://www.mediacongo.net/")
            .then(function name(result) {
            return result.text();
        })
            .then(function (params) {
            const scrapper = cheerio_1.default.load(params);
            let doc = scrapper("p");
            const val = doc.toArray();
            res.send(val[0]);
        })
            .catch(function name() {
            res.end({
                "speech": "Nous n'avons pas d'information sur votre recherche."
            });
        });
    }
}
exports.Simple = Simple;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGluZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9yb3V0aW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUNBLDZDQUErQjtBQUMvQiw0REFBK0I7QUFDL0Isc0RBQThCO0FBQzlCLElBQUksR0FBRyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsa0NBQWtDLENBQUMsQ0FBQztBQUM1RCxtREFBMEM7QUFDMUMsa0VBQXVFO0FBSXZFO0lBQ1csTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBb0IsRUFBRSxHQUFxQjtRQUNqRSxJQUFJLE9BQU8sR0FBRyxHQUFHLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQzVDLFNBQVMsRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUs7U0FDNUIsQ0FBQyxDQUFDO1FBRUgsT0FBTyxDQUFDLEVBQUUsQ0FBQyxVQUFVLEVBQUUsVUFBUyxRQUFhO1lBQ3pDLEdBQUcsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDaEQsQ0FBQyxDQUFDLENBQUM7UUFFSCxPQUFPLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxVQUFTLEtBQVU7WUFDbkMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN2QixDQUFDLENBQUMsQ0FBQztRQUNILE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUVsQixDQUFDO0lBRU0sTUFBTSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsR0FBb0IsRUFBRSxHQUFxQjtRQUN0RSxJQUFJLFVBQVUsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUM7UUFDNUMsSUFBSSxNQUFNLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQztRQUNqRCxP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