"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = __importDefault(require("node-fetch"));
class WikipediaApp {
    constructor() { }
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
}
exports.WikipediaApp = WikipediaApp;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2lraXBlZGlhLmFwcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy93aWtpcGVkaWFBcHAvd2lraXBlZGlhLmFwcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUNBLDREQUErQjtBQUMvQjtJQUNJLGdCQUFlLENBQUM7SUFDVCxNQUFNLENBQUMsZUFBZSxDQUFDLEdBQW9CLEVBQUUsR0FBcUIsRUFBRSxVQUFlO1FBQ3RGLG9CQUFLLENBQUMseUZBQXlGLEdBQUMsVUFBVSxDQUFDLEdBQUcsR0FBQyxZQUFZLENBQUM7YUFDM0gsSUFBSSxDQUFDLGNBQWMsTUFBTTtZQUN0QixPQUFPLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN6QixDQUFDLENBQUM7YUFDRCxJQUFJLENBQUMsY0FBYyxJQUFJO1lBQ3BCLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQWlCLENBQUM7WUFDdEQsUUFBUSxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsOEJBQThCLEVBQUMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBQyxFQUFFLENBQUM7aUJBQ25GLE9BQU8sQ0FBQyw4QkFBOEIsRUFBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFDLEVBQUUsQ0FBQztpQkFDaEUsT0FBTyxDQUFDLDhCQUE4QixFQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUMsRUFBRSxDQUFDO2lCQUNoRSxPQUFPLENBQUMsOEJBQThCLEVBQUMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBQyxFQUFFLENBQUM7aUJBQ2hFLE9BQU8sQ0FBQyw4QkFBOEIsRUFBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ2xFLElBQUksUUFBUSxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDbkMsSUFBRyxRQUFRLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsS0FBSyxPQUFPLEVBQUM7Z0JBQ3pDLFFBQVEsSUFBSSxZQUFZLENBQUM7YUFDNUI7WUFDRCxHQUFHLENBQUMsSUFBSSxDQUFDO2dCQUNMLFFBQVEsRUFBRSxtQkFBbUIsR0FBQyxRQUFRO2FBQ3pDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQzthQUNELEtBQUssQ0FBQztZQUNILEdBQUcsQ0FBQyxHQUFHLENBQUM7Z0JBQ0osUUFBUSxFQUFFLHFEQUFxRDthQUNsRSxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUM7Q0FDSjtBQTVCRCxvQ0E0QkMifQ==