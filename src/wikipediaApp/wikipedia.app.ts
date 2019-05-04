import express from 'express';
import fetch from 'node-fetch';
export class WikipediaApp {
    constructor() {}
    public static fetchWikiPerson(req: express.Request, res: express.Response, parameters: any) {
        fetch("https://fr.wikipedia.org/w/api.php?format=json&utf8=&action=query&list=search&srsearch="+parameters.any+"&srlimit=1")
        .then(function name(result) {
            return result.json();
        })
        .then(function name(body) {
            let wiki_res = body.query.search[0].snippet as string;
            wiki_res = wiki_res.replace("<span class=\"searchmatch\">","").replace("</span>","")
            .replace("<span class=\"searchmatch\">","").replace("</span>","")
            .replace("<span class=\"searchmatch\">","").replace("</span>","")
            .replace("<span class=\"searchmatch\">","").replace("</span>","")
            .replace("<span class=\"searchmatch\">","").replace("</span>","");
            let splitter = wiki_res.split(' ');
            if(splitter[splitter.length - 1] === "homme"){
                wiki_res += " politique";
            }
            res.json({
                "speech": "Sélon Wikipédia, "+wiki_res
            });
        })
        .catch(function name() {
            res.end({
                "speech": "Nous n'avons pas d'information sur votre recherche."
            }); 
        }) 
    }
}