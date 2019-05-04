import express from 'express';
import fetch from 'node-fetch';

export class MediaApp {
    constructor() {
        
    }
    public static fetchMediaCongo(req: express.Request, res: express.Response, parameters: any){
        fetch("https://www.mediacongo.net/")
        .then(function name(result) {
            return result.text();
        })
        .then(function (params:string) {
            const scrapper = cheerio.load(params);
            let doc  = scrapper("p");
            const val = doc.toArray();
            res.send(val[0]);
        })
        .catch(function name() {
            res.end({
                "speech": "Nous n'avons pas d'information sur votre recherche."
            }); 
        }) 
    }
}