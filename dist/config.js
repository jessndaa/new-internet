"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = __importStar(require("mysql"));
const bcrypt = __importStar(require("bcrypt"));
class Connector {
    constructor() {
        this.All = (table, func) => {
            this.connection.query(`SELECT * FROM ${table}`, func);
        };
        this.where = (table, column, wr, func) => {
            this.connection.query(`SELECT * FROM ${table} WHERE ${column} = ?`, [wr], func);
        };
        this.limit = (table, limit, func) => {
            this.connection.query(`SELECT * FROM ${table} limit ${limit}`, func);
        };
        this.add = (sql, func) => {
            this.connection.query(sql, func);
        };
        this.connection = mysql.createConnection({
            host: 'eu-cdbr-west-02.cleardb.net',
            user: 'b14c075b54a698',
            password: 'c17fe34b',
            database: 'heroku_90bebde67583574',
        });
        this.connection.connect((err) => {
            if (err)
                throw err;
        });
    }
    static get instance() {
        if (!this._instatnce) {
            this._instatnce = new Connector();
        }
        return this._instatnce;
    }
    static formatStr(str) {
        return mysql.escape(str);
    }
    static hashPass(pass) {
        return bcrypt.hashSync(pass, 10);
    }
    static comparePass(enterpass, hashed) {
        return bcrypt.compareSync(enterpass, hashed);
    }
}
exports.Connector = Connector;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2NvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSw2Q0FBK0I7QUFDL0IsK0NBQWdDO0FBRWhDO0lBVUk7UUFvQk8sUUFBRyxHQUFHLENBQUMsS0FBYSxFQUFFLElBQXlCLEVBQUUsRUFBRTtZQUN0RCxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsS0FBSyxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDMUQsQ0FBQyxDQUFBO1FBRU0sVUFBSyxHQUFHLENBQUMsS0FBYSxFQUFFLE1BQWMsRUFBRSxFQUFVLEVBQUUsSUFBeUIsRUFBRSxFQUFFO1lBQ3BGLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLGlCQUFpQixLQUFLLFVBQVUsTUFBTSxNQUFNLEVBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNuRixDQUFDLENBQUE7UUFFTSxVQUFLLEdBQUcsQ0FBQyxLQUFhLEVBQUUsS0FBYSxFQUFFLElBQXlCLEVBQUUsRUFBRTtZQUN2RSxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsS0FBSyxVQUFVLEtBQUssRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3pFLENBQUMsQ0FBQTtRQUVNLFFBQUcsR0FBRyxDQUFDLEdBQVcsRUFBRyxJQUF5QixFQUFFLEVBQUU7WUFDckQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3JDLENBQUMsQ0FBQTtRQWpDRyxJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQztZQUNyQyxJQUFJLEVBQU8sNkJBQTZCO1lBQ3hDLElBQUksRUFBTyxnQkFBZ0I7WUFDM0IsUUFBUSxFQUFHLFVBQVU7WUFDckIsUUFBUSxFQUFHLHdCQUF3QjtTQUN0QyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO1lBQzVCLElBQUksR0FBRztnQkFBRSxNQUFNLEdBQUcsQ0FBQztRQUN2QixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFoQk0sTUFBTSxLQUFLLFFBQVE7UUFDdEIsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDbEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLFNBQVMsRUFBRSxDQUFDO1NBQ3JDO1FBQ0QsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQzNCLENBQUM7SUFZTSxNQUFNLENBQUMsU0FBUyxDQUFDLEdBQVE7UUFDNUIsT0FBUyxLQUFLLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFDTSxNQUFNLENBQUMsUUFBUSxDQUFDLElBQVM7UUFDN0IsT0FBTyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBQ00sTUFBTSxDQUFDLFdBQVcsQ0FBQyxTQUFjLEVBQUUsTUFBVztRQUNsRCxPQUFPLE1BQU0sQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ2hELENBQUM7Q0FnQko7QUE3Q0QsOEJBNkNDIn0=