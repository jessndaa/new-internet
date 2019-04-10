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
var app = apiai.default("4fa7646395134bb8a2a59fa2f5f78f4a");
class Simple {
    static async index(req, res) {
        var request = app.textRequest(req.body.message, {
            sessionId: '<unique session id>'
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
        const intent = req.body.result.intentName;
        switch (intent) {
            case "wiki.about.person":
                const seach = parameters.any;
                node_fetch_1.default("https://fr.wikipedia.org/w/api.php?format=json&utf8=&action=query&list=search&srsearch=" + seach + "&srlimit=1")
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
                break;
            default:
                res.end({
                    "speech": "Nous n'avons pas d'information sur votre recherche."
                });
                break;
        }
        res.end({
            "speech": "Nous n'avons pas d'information sur votre recherche."
        });
    }
}
exports.Simple = Simple;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGluZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9yb3V0aW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUNBLDZDQUErQjtBQUMvQiw0REFBOEI7QUFDOUIsSUFBSSxHQUFHLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDO0FBRTVEO0lBQ1csTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBb0IsRUFBRSxHQUFxQjtRQUNqRSxJQUFJLE9BQU8sR0FBRyxHQUFHLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQzVDLFNBQVMsRUFBRSxxQkFBcUI7U0FDbkMsQ0FBQyxDQUFDO1FBRUgsT0FBTyxDQUFDLEVBQUUsQ0FBQyxVQUFVLEVBQUUsVUFBUyxRQUFhO1lBQ3pDLEdBQUcsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDaEQsQ0FBQyxDQUFDLENBQUM7UUFFSCxPQUFPLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxVQUFTLEtBQVU7WUFDbkMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN2QixDQUFDLENBQUMsQ0FBQztRQUNILE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUVsQixDQUFDO0lBRU0sTUFBTSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsR0FBb0IsRUFBRSxHQUFxQjtRQUN0RSxJQUFJLFVBQVUsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUM7UUFDNUMsTUFBTSxNQUFNLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDO1FBQzFDLFFBQU8sTUFBTSxFQUFDO1lBQ1YsS0FBSyxtQkFBbUI7Z0JBQ3BCLE1BQU0sS0FBSyxHQUFHLFVBQVUsQ0FBQyxHQUFHLENBQUM7Z0JBQzdCLG9CQUFLLENBQUMseUZBQXlGLEdBQUMsS0FBSyxHQUFDLFlBQVksQ0FBQztxQkFDbEgsSUFBSSxDQUFDLGNBQWMsTUFBTTtvQkFDdEIsT0FBTyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQ3pCLENBQUMsQ0FBQztxQkFDRCxJQUFJLENBQUMsY0FBYyxJQUFJO29CQUNwQixJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFpQixDQUFDO29CQUN0RCxRQUFRLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyw4QkFBOEIsRUFBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFDLEVBQUUsQ0FBQzt5QkFDbkYsT0FBTyxDQUFDLDhCQUE4QixFQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUMsRUFBRSxDQUFDO3lCQUNoRSxPQUFPLENBQUMsOEJBQThCLEVBQUMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBQyxFQUFFLENBQUM7eUJBQ2hFLE9BQU8sQ0FBQyw4QkFBOEIsRUFBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFDLEVBQUUsQ0FBQzt5QkFDaEUsT0FBTyxDQUFDLDhCQUE4QixFQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUMsRUFBRSxDQUFDLENBQUM7b0JBQ2xFLElBQUksUUFBUSxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ25DLElBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLEtBQUssT0FBTyxFQUFDO3dCQUN6QyxRQUFRLElBQUksWUFBWSxDQUFDO3FCQUM1QjtvQkFDRCxHQUFHLENBQUMsSUFBSSxDQUFDO3dCQUNMLFFBQVEsRUFBRSxtQkFBbUIsR0FBQyxRQUFRO3FCQUN6QyxDQUFDLENBQUM7Z0JBQ1AsQ0FBQyxDQUFDO3FCQUNELEtBQUssQ0FBQztvQkFDSCxHQUFHLENBQUMsR0FBRyxDQUFDO3dCQUNKLFFBQVEsRUFBRSxxREFBcUQ7cUJBQ2xFLENBQUMsQ0FBQztnQkFDUCxDQUFDLENBQUMsQ0FBQztnQkFDSCxNQUFNO1lBQ1Y7Z0JBQ0ksR0FBRyxDQUFDLEdBQUcsQ0FBQztvQkFDSixRQUFRLEVBQUUscURBQXFEO2lCQUNsRSxDQUFDLENBQUM7Z0JBQ0gsTUFBTTtTQUNiO1FBQ0QsR0FBRyxDQUFDLEdBQUcsQ0FBQztZQUNKLFFBQVEsRUFBRSxxREFBcUQ7U0FDbEUsQ0FBQyxDQUFDO0lBQ1gsQ0FBQztDQUNKO0FBMURELHdCQTBEQyJ9