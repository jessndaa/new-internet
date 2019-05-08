"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const apiai = __importStar(require("apiai"));
var app = apiai.default("4fa7646395134bb8a2a59fa2f5f78f4a");
const university_app_1 = require("./univertyApp/university.app");
const wikipedia_app_1 = require("./wikipediaApp/wikipedia.app");
const media_app_1 = require("./media.app/media.app");
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
        try {
            switch (intent) {
                case "wiki.about.person":
                    wikipedia_app_1.WikipediaApp.fetchWikiPerson(req, res, parameters);
                    break;
                case "web.media.info":
                    media_app_1.MediaApp.fetchMediaCongo(req, res, parameters);
                    break;
                case "univ.info.day":
                    university_app_1.UniversityApp.getInfoDay(req, res, parameters);
                    break;
                case "univ.student.present.all":
                    await university_app_1.UniversityApp.storeStudent(req, res, parameters);
                    break;
                case "univ.promotion.inetrrogation":
                    await university_app_1.UniversityApp.getInterroDate(req, res, parameters);
                    break;
                case "univ.promotion.tp.about":
                    await university_app_1.UniversityApp.getHaveTp(req, res, parameters);
                    break;
                default:
                    res.json({
                        "speech": "Nous n'avons pas d'information sur votre recherche."
                    });
                    break;
            }
        }
        catch (error) {
            res.json({
                "speech": error.message
            });
        }
    }
}
exports.Simple = Simple;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGluZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9yb3V0aW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBLDZDQUErQjtBQUcvQixJQUFJLEdBQUcsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLGtDQUFrQyxDQUFDLENBQUM7QUFJNUQsaUVBQTZEO0FBQzdELGdFQUE0RDtBQUM1RCxxREFBaUQ7QUFHakQ7SUFDVyxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFvQixFQUFFLEdBQXFCO1FBQ2pFLElBQUksT0FBTyxHQUFHLEdBQUcsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDNUMsU0FBUyxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSztTQUM1QixDQUFDLENBQUM7UUFFSCxPQUFPLENBQUMsRUFBRSxDQUFDLFVBQVUsRUFBRSxVQUFTLFFBQWE7WUFDekMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNoRCxDQUFDLENBQUMsQ0FBQztRQUVILE9BQU8sQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLFVBQVMsS0FBVTtZQUNuQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3ZCLENBQUMsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQ2xCLENBQUM7SUFFTSxNQUFNLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxHQUFvQixFQUFFLEdBQXFCO1FBQ3RFLElBQUksVUFBVSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQztRQUM1QyxJQUFJLE1BQU0sR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDO1FBQ2pELElBQUk7WUFDQSxRQUFRLE1BQU0sRUFBRTtnQkFDWixLQUFLLG1CQUFtQjtvQkFDcEIsNEJBQVksQ0FBQyxlQUFlLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxVQUFVLENBQUMsQ0FBQztvQkFDbkQsTUFBTTtnQkFDVixLQUFLLGdCQUFnQjtvQkFDakIsb0JBQVEsQ0FBQyxlQUFlLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxVQUFVLENBQUMsQ0FBQTtvQkFDOUMsTUFBTTtnQkFDVixLQUFLLGVBQWU7b0JBQ2hCLDhCQUFhLENBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUE7b0JBQzlDLE1BQU07Z0JBQ1YsS0FBSywwQkFBMEI7b0JBQzNCLE1BQU0sOEJBQWEsQ0FBQyxZQUFZLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxVQUFVLENBQUMsQ0FBQTtvQkFDdEQsTUFBTTtnQkFDVixLQUFLLDhCQUE4QjtvQkFDL0IsTUFBTSw4QkFBYSxDQUFDLGNBQWMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLFVBQVUsQ0FBQyxDQUFBO29CQUN4RCxNQUFNO2dCQUNWLEtBQUsseUJBQXlCO29CQUMxQixNQUFNLDhCQUFhLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUE7b0JBQ25ELE1BQU07Z0JBQ1Y7b0JBQ0ksR0FBRyxDQUFDLElBQUksQ0FBQzt3QkFDTCxRQUFRLEVBQUUscURBQXFEO3FCQUNsRSxDQUFDLENBQUM7b0JBQ0gsTUFBTTthQUNiO1NBQ0o7UUFBQyxPQUFPLEtBQUssRUFBRTtZQUNaLEdBQUcsQ0FBQyxJQUFJLENBQUM7Z0JBQ0wsUUFBUSxFQUFDLEtBQUssQ0FBQyxPQUFPO2FBQ3pCLENBQUMsQ0FBQztTQUNOO0lBQ1QsQ0FBQztDQUNKO0FBbkRELHdCQW1EQyJ9