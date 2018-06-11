import express from 'express';
import {ConnectionPool, config, IResult} from "mssql";
const serve = express();

const conf: config = {
    user: 'sa',
    database: 'testdb',
    server: 'TOSHIBA\\MSSQLSERVER'
}


serve.get('', (req, res) =>{
    const pool = new ConnectionPool(conf);
    pool.connect().then(e =>{
        const result = pool.query`select * from mytable where id`;
        result.then((mess)  => {
            res.send(mess);
        })
    }).catch(err =>{
        res.send(err);
    })
})
serve.listen(8000)