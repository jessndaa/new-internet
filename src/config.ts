import * as mysql from 'mysql';
import * as bcrypt from 'bcrypt'

export class Connector {
    private connection: mysql.Connection;

    private static _instatnce: Connector;
    public static get instance(): Connector {
        if (!this._instatnce) {
            this._instatnce = new Connector();
        }
        return this._instatnce;
    }
    constructor() {
        this.connection = mysql.createConnection({
            host     : 'eu-cdbr-west-02.cleardb.net',
            user     : 'b14c075b54a698',
            password : 'c17fe34b',
            database : 'heroku_90bebde67583574',
        });
        this.connection.connect((err) =>{
            if (err) throw err;            
        });
    }
    public static formatStr(str: any){
        return   mysql.escape(str);
    }
    public static hashPass(pass: any) {
       return bcrypt.hashSync(pass, 10);
    }
    public static comparePass(enterpass: any, hashed: any){
       return bcrypt.compareSync(enterpass, hashed); 
    }
    public All = (table: String, func: mysql.queryCallback) => {
        this.connection.query(`SELECT * FROM ${table}`, func);
    }

    public where = (table: String, column: String, wr: String, func: mysql.queryCallback) => {
        this.connection.query(`SELECT * FROM ${table} WHERE ${column} = ?`,[wr], func);
    }

    public limit = (table: String, limit: number, func: mysql.queryCallback) => {
        this.connection.query(`SELECT * FROM ${table} limit ${limit}`, func);
    }

    public add = (sql: string,  func: mysql.queryCallback) => {
        this.connection.query(sql, func);
    }
}