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
                    console.log("oooops");
                    await university_app_1.UniversityApp.storeStudent(req, res, parameters);
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
}
exports.Simple = Simple;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGluZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9yb3V0aW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBLDZDQUErQjtBQUcvQixJQUFJLEdBQUcsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLGtDQUFrQyxDQUFDLENBQUM7QUFJNUQsaUVBQTZEO0FBQzdELGdFQUE0RDtBQUM1RCxxREFBaUQ7QUFHakQ7SUFDVyxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFvQixFQUFFLEdBQXFCO1FBQ2pFLElBQUksT0FBTyxHQUFHLEdBQUcsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDNUMsU0FBUyxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSztTQUM1QixDQUFDLENBQUM7UUFFSCxPQUFPLENBQUMsRUFBRSxDQUFDLFVBQVUsRUFBRSxVQUFTLFFBQWE7WUFDekMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNoRCxDQUFDLENBQUMsQ0FBQztRQUVILE9BQU8sQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLFVBQVMsS0FBVTtZQUNuQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3ZCLENBQUMsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQ2xCLENBQUM7SUFFTSxNQUFNLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxHQUFvQixFQUFFLEdBQXFCO1FBQ3RFLElBQUksVUFBVSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQztRQUM1QyxJQUFJLE1BQU0sR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDO1FBQ2pELElBQUk7WUFDQSxRQUFRLE1BQU0sRUFBRTtnQkFDWixLQUFLLG1CQUFtQjtvQkFDcEIsNEJBQVksQ0FBQyxlQUFlLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxVQUFVLENBQUMsQ0FBQztvQkFDbkQsTUFBTTtnQkFDVixLQUFLLGdCQUFnQjtvQkFDakIsb0JBQVEsQ0FBQyxlQUFlLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxVQUFVLENBQUMsQ0FBQTtvQkFDOUMsTUFBTTtnQkFDVixLQUFLLGVBQWU7b0JBQ2hCLDhCQUFhLENBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUE7b0JBQzlDLE1BQU07Z0JBQ1YsS0FBSywwQkFBMEI7b0JBQzNCLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7b0JBRXRCLE1BQU0sOEJBQWEsQ0FBQyxZQUFZLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxVQUFVLENBQUMsQ0FBQTtvQkFDdEQsTUFBTTtnQkFDVjtvQkFDSSxHQUFHLENBQUMsR0FBRyxDQUFDO3dCQUNKLFFBQVEsRUFBRSxxREFBcUQ7cUJBQ2xFLENBQUMsQ0FBQztvQkFDSCxNQUFNO2FBQ2I7U0FDSjtRQUFDLE9BQU8sS0FBSyxFQUFFO1lBQ1osR0FBRyxDQUFDLEdBQUcsQ0FBQztnQkFDSixRQUFRLEVBQUUscURBQXFEO2FBQ2xFLENBQUMsQ0FBQztTQUNOO0lBQ1QsQ0FBQztDQUNKO0FBL0NELHdCQStDQyJ9