"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = __importDefault(require("node-fetch"));
class MediaApp {
    constructor() {
    }
    static fetchMediaCongo(req, res, parameters) {
        node_fetch_1.default("https://www.mediacongo.net/")
            .then(function name(result) {
            return result.text();
        })
            .then(function (params) {
            const scrapper = cheerio.load(params);
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
exports.MediaApp = MediaApp;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVkaWEuYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21lZGlhLmFwcC9tZWRpYS5hcHAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSw0REFBK0I7QUFFL0I7SUFDSTtJQUVBLENBQUM7SUFDTSxNQUFNLENBQUMsZUFBZSxDQUFDLEdBQW9CLEVBQUUsR0FBcUIsRUFBRSxVQUFlO1FBQ3RGLG9CQUFLLENBQUMsNkJBQTZCLENBQUM7YUFDbkMsSUFBSSxDQUFDLGNBQWMsTUFBTTtZQUN0QixPQUFPLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN6QixDQUFDLENBQUM7YUFDRCxJQUFJLENBQUMsVUFBVSxNQUFhO1lBQ3pCLE1BQU0sUUFBUSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDdEMsSUFBSSxHQUFHLEdBQUksUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3pCLE1BQU0sR0FBRyxHQUFHLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUMxQixHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3JCLENBQUMsQ0FBQzthQUNELEtBQUssQ0FBQztZQUNILEdBQUcsQ0FBQyxHQUFHLENBQUM7Z0JBQ0osUUFBUSxFQUFFLHFEQUFxRDthQUNsRSxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUM7Q0FDSjtBQXJCRCw0QkFxQkMifQ==