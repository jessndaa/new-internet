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
            this.connection.connect(() => {
                this.connection.query(`SELECT * FROM ${table}`, func)
                    .on('result', () => {
                    this.connection.end();
                });
            });
        };
        this.where = (table, column, wr, func) => {
            this.connection.connect(() => {
                this.connection.query(`SELECT * FROM ${table} WHERE ${column} = ?`, [wr], func)
                    .on('result', () => {
                    this.connection.end();
                });
            });
        };
        this.limit = (table, limit, func) => {
            this.connection.connect(() => {
                this.connection.query(`SELECT * FROM ${table} limit ${limit}`, func)
                    .on('result', () => {
                    this.connection.end();
                });
            });
        };
        this.add = (sql, func) => {
            this.connection.connect(() => {
                this.connection.query(sql, func).on('result', () => {
                    this.connection.end();
                });
            });
        };
        // TODO : prod-mode
        this.connection = mysql.createConnection({
            host: 'eu-cdbr-west-02.cleardb.net',
            user: 'b14c075b54a698',
            password: 'c17fe34b',
            database: 'heroku_90bebde67583574',
        });
        /**
         * configuration de la base de donné mySql
         */
        // this.connection = mysql.createConnection({
        //     host     : 'localhost',
        //     user     : 'root',
        //     password : '',
        //     database : 'pf_db',
        // });
        /**
 * fin config db
 */
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2NvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSw2Q0FBK0I7QUFDL0IsK0NBQWdDO0FBRWhDO0lBVUk7UUFpQ08sUUFBRyxHQUFHLENBQUMsS0FBYSxFQUFFLElBQXlCLEVBQUUsRUFBRTtZQUN0RCxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUU7Z0JBQ3pCLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLGlCQUFpQixLQUFLLEVBQUUsRUFBRSxJQUFJLENBQUM7cUJBQ3BELEVBQUUsQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFO29CQUNmLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUM7Z0JBQzFCLENBQUMsQ0FBQyxDQUFDO1lBQ1AsQ0FBQyxDQUFDLENBQUM7UUFFUCxDQUFDLENBQUE7UUFFTSxVQUFLLEdBQUcsQ0FBQyxLQUFhLEVBQUUsTUFBYyxFQUFFLEVBQVUsRUFBRSxJQUF5QixFQUFFLEVBQUU7WUFDcEYsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFO2dCQUN6QixJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsS0FBSyxVQUFVLE1BQU0sTUFBTSxFQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDO3FCQUM3RSxFQUFFLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRTtvQkFDZixJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDO2dCQUMxQixDQUFDLENBQUMsQ0FBQztZQUNQLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFBO1FBRU0sVUFBSyxHQUFHLENBQUMsS0FBYSxFQUFFLEtBQWEsRUFBRSxJQUF5QixFQUFFLEVBQUU7WUFDdkUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFO2dCQUNyQixJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsS0FBSyxVQUFVLEtBQUssRUFBRSxFQUFFLElBQUksQ0FBQztxQkFDL0QsRUFBRSxDQUFDLFFBQVEsRUFBQyxHQUFHLEVBQUU7b0JBQ2QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQztnQkFDMUIsQ0FBQyxDQUFDLENBQUM7WUFDZixDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQTtRQUVNLFFBQUcsR0FBRyxDQUFDLEdBQVcsRUFBRyxJQUF5QixFQUFFLEVBQUU7WUFDckQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFO2dCQUNyQixJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUU7b0JBQy9DLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUM7Z0JBQzFCLENBQUMsQ0FBQyxDQUFDO1lBQ1AsQ0FBQyxDQUFDLENBQUM7UUFDWCxDQUFDLENBQUE7UUFsRUcsbUJBQW1CO1FBQ25CLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDLGdCQUFnQixDQUFDO1lBQ3JDLElBQUksRUFBTyw2QkFBNkI7WUFDeEMsSUFBSSxFQUFPLGdCQUFnQjtZQUMzQixRQUFRLEVBQUcsVUFBVTtZQUNyQixRQUFRLEVBQUcsd0JBQXdCO1NBQ3RDLENBQUMsQ0FBQztRQUVIOztXQUVHO1FBQ0gsNkNBQTZDO1FBQzdDLDhCQUE4QjtRQUM5Qix5QkFBeUI7UUFDekIscUJBQXFCO1FBQ3JCLDBCQUEwQjtRQUMxQixNQUFNO1FBRUU7O0dBRUw7SUFDUCxDQUFDO0lBNUJNLE1BQU0sS0FBSyxRQUFRO1FBQ3RCLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ2xCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxTQUFTLEVBQUUsQ0FBQztTQUNyQztRQUNELE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztJQUMzQixDQUFDO0lBeUJNLE1BQU0sQ0FBQyxTQUFTLENBQUMsR0FBUTtRQUM1QixPQUFTLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQUNNLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBUztRQUM3QixPQUFPLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFDTSxNQUFNLENBQUMsV0FBVyxDQUFDLFNBQWMsRUFBRSxNQUFXO1FBQ2xELE9BQU8sTUFBTSxDQUFDLFdBQVcsQ0FBQyxTQUFTLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDaEQsQ0FBQztDQW9DSjtBQTlFRCw4QkE4RUMifQ==