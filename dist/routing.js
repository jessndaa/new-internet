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
        let cc = req.body.queryResult.parameters.wiki_name;
        node_fetch_1.default("https://fr.wikipedia.org/w/api.php?format=json&utf8=&action=query&list=search&srsearch=" + cc + "&srlimit=1")
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
            res.end(wiki_res);
        })
            .catch(function name() {
            res.end("response");
        });
    }
}
exports.Simple = Simple;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGluZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9yb3V0aW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUNBLDZDQUErQjtBQUMvQiw0REFBOEI7QUFDOUIsSUFBSSxHQUFHLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDO0FBRTVEO0lBQ1csTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBb0IsRUFBRSxHQUFxQjtRQUNqRSxJQUFJLE9BQU8sR0FBRyxHQUFHLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQzVDLFNBQVMsRUFBRSxxQkFBcUI7U0FDbkMsQ0FBQyxDQUFDO1FBRUgsT0FBTyxDQUFDLEVBQUUsQ0FBQyxVQUFVLEVBQUUsVUFBUyxRQUFhO1lBQ3pDLEdBQUcsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDaEQsQ0FBQyxDQUFDLENBQUM7UUFFSCxPQUFPLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxVQUFTLEtBQVU7WUFDbkMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN2QixDQUFDLENBQUMsQ0FBQztRQUNILE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUVsQixDQUFDO0lBRU0sTUFBTSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsR0FBb0IsRUFBRSxHQUFxQjtRQUN0RSxJQUFJLEVBQUUsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDO1FBQ25ELG9CQUFLLENBQUMseUZBQXlGLEdBQUMsRUFBRSxHQUFDLFlBQVksQ0FBQzthQUMvRyxJQUFJLENBQUMsY0FBYyxNQUFNO1lBQ3RCLE9BQU8sTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3pCLENBQUMsQ0FBQzthQUNELElBQUksQ0FBQyxjQUFjLElBQUk7WUFDcEIsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBaUIsQ0FBQztZQUN0RCxRQUFRLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyw4QkFBOEIsRUFBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFDLEVBQUUsQ0FBQztpQkFDbkYsT0FBTyxDQUFDLDhCQUE4QixFQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUMsRUFBRSxDQUFDO2lCQUNoRSxPQUFPLENBQUMsOEJBQThCLEVBQUMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBQyxFQUFFLENBQUM7aUJBQ2hFLE9BQU8sQ0FBQyw4QkFBOEIsRUFBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFDLEVBQUUsQ0FBQztpQkFDaEUsT0FBTyxDQUFDLDhCQUE4QixFQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUMsRUFBRSxDQUFDLENBQUM7WUFDbEUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQTtRQUNyQixDQUFDLENBQUM7YUFDRCxLQUFLLENBQUM7WUFDSCxHQUFHLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3hCLENBQUMsQ0FBQyxDQUFBO0lBRVYsQ0FBQztDQUNKO0FBckNELHdCQXFDQyJ9