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
        // let cc = req.body.result.parameters.wiki_name;
        // fetch("https://fr.wikipedia.org/w/api.php?format=json&utf8=&action=query&list=search&srsearch="+cc+"&srlimit=1")
        // .then(function name(result) {
        //     return result.json();
        // })
        // .then(function name(body) {
        //     let wiki_res = body.query.search[0].snippet as string;
        //     wiki_res = wiki_res.replace("<span class=\"searchmatch\">","").replace("</span>","")
        //     .replace("<span class=\"searchmatch\">","").replace("</span>","")
        //     .replace("<span class=\"searchmatch\">","").replace("</span>","")
        //     .replace("<span class=\"searchmatch\">","").replace("</span>","")
        //     .replace("<span class=\"searchmatch\">","").replace("</span>","");
        //     res.end("Sélon Wikipédia, "+wiki_res)  
        // })
        // .catch(function name() {
        //     res.end("response"); 
        // })
        res.json({ "displayText": "this text is displayed visually" });
    }
}
exports.Simple = Simple;
// {
//     "speech": "this text is spoken out loud if the platform supports voice interactions",
//     "displayText": "this text is displayed visually",
//     "messages": {
//       "type": 1,
//       "title": "card title",
//       "subtitle": "card text",
//       "imageUrl": "https://assistant.google.com/static/images/molecule/Molecule-Formation-stop.png"
//     },
//     "data": {
//       "google": {
//         "expectUserResponse": true,
//         "richResponse": {
//           "items": [
//             {
//               "simpleResponse": {
//                 "textToSpeech": "this is a simple response"
//               }
//             }
//           ]
//         }
//       },
//       "facebook": {
//         "text": "Hello, Facebook!"
//       },
//       "slack": {
//         "text": "This is a text response for Slack."
//       }
//     },
//     "contextOut": [
//       {
//         "name": "context name",
//         "lifespan": 5,
//         "parameters": {
//           "param": "param value"
//         }
//       }
//     ],
//     "source": "example.com",
//     "followupEvent": {
//       "name": "event name",
//       "parameters": {
//         "param": "param value"
//       }
//     }
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGluZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9yb3V0aW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBLDZDQUErQjtBQUUvQixJQUFJLEdBQUcsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLGtDQUFrQyxDQUFDLENBQUM7QUFFNUQ7SUFDVyxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFvQixFQUFFLEdBQXFCO1FBQ2pFLElBQUksT0FBTyxHQUFHLEdBQUcsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDNUMsU0FBUyxFQUFFLHFCQUFxQjtTQUNuQyxDQUFDLENBQUM7UUFFSCxPQUFPLENBQUMsRUFBRSxDQUFDLFVBQVUsRUFBRSxVQUFTLFFBQWE7WUFDekMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNoRCxDQUFDLENBQUMsQ0FBQztRQUVILE9BQU8sQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLFVBQVMsS0FBVTtZQUNuQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3ZCLENBQUMsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBRWxCLENBQUM7SUFFTSxNQUFNLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxHQUFvQixFQUFFLEdBQXFCO1FBQ3RFLGlEQUFpRDtRQUNqRCxtSEFBbUg7UUFDbkgsZ0NBQWdDO1FBQ2hDLDRCQUE0QjtRQUM1QixLQUFLO1FBQ0wsOEJBQThCO1FBQzlCLDZEQUE2RDtRQUM3RCwyRkFBMkY7UUFDM0Ysd0VBQXdFO1FBQ3hFLHdFQUF3RTtRQUN4RSx3RUFBd0U7UUFDeEUseUVBQXlFO1FBQ3pFLDhDQUE4QztRQUM5QyxLQUFLO1FBQ0wsMkJBQTJCO1FBQzNCLDRCQUE0QjtRQUM1QixLQUFLO1FBQ0wsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFDLGFBQWEsRUFBRSxpQ0FBaUMsRUFBQyxDQUFDLENBQUM7SUFFckUsQ0FBQztDQUNKO0FBdENELHdCQXNDQztBQUVELElBQUk7QUFDSiw0RkFBNEY7QUFDNUYsd0RBQXdEO0FBQ3hELG9CQUFvQjtBQUNwQixtQkFBbUI7QUFDbkIsK0JBQStCO0FBQy9CLGlDQUFpQztBQUNqQyxzR0FBc0c7QUFDdEcsU0FBUztBQUNULGdCQUFnQjtBQUNoQixvQkFBb0I7QUFDcEIsc0NBQXNDO0FBQ3RDLDRCQUE0QjtBQUM1Qix1QkFBdUI7QUFDdkIsZ0JBQWdCO0FBQ2hCLG9DQUFvQztBQUNwQyw4REFBOEQ7QUFDOUQsa0JBQWtCO0FBQ2xCLGdCQUFnQjtBQUNoQixjQUFjO0FBQ2QsWUFBWTtBQUNaLFdBQVc7QUFDWCxzQkFBc0I7QUFDdEIscUNBQXFDO0FBQ3JDLFdBQVc7QUFDWCxtQkFBbUI7QUFDbkIsdURBQXVEO0FBQ3ZELFVBQVU7QUFDVixTQUFTO0FBQ1Qsc0JBQXNCO0FBQ3RCLFVBQVU7QUFDVixrQ0FBa0M7QUFDbEMseUJBQXlCO0FBQ3pCLDBCQUEwQjtBQUMxQixtQ0FBbUM7QUFDbkMsWUFBWTtBQUNaLFVBQVU7QUFDVixTQUFTO0FBQ1QsK0JBQStCO0FBQy9CLHlCQUF5QjtBQUN6Qiw4QkFBOEI7QUFDOUIsd0JBQXdCO0FBQ3hCLGlDQUFpQztBQUNqQyxVQUFVO0FBQ1YsUUFBUSJ9