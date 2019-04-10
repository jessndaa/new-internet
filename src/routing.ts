import express from 'express';
import * as apiai from 'apiai';
import fetch from 'node-fetch'
var app = apiai.default("4fa7646395134bb8a2a59fa2f5f78f4a");

export class Simple {
    public static async index(req: express.Request, res: express.Response)  {
        var request = app.textRequest(req.body.message, {
            sessionId: '<unique session id>'
        });
        
        request.on('response', function(response: any) {
            res.end(response.result.fulfillment.speech);
        });
        
        request.on('error', function(error: any) {
            console.log(error);
        });
        request.end();
       
    }

    public static async wikipediaindex(req: express.Request, res: express.Response)  {
            let parameters = req.body.result.parameters;
            const intent = req.body.result.intentName;
            switch(intent){
                case "wiki.about.person":
                    const seach = parameters.any;
                    fetch("https://fr.wikipedia.org/w/api.php?format=json&utf8=&action=query&list=search&srsearch="+seach+"&srlimit=1")
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
                    });
                    break;
                default:
                    res.end({
                        "speech": "Nous n'avons pas d'information sur votre recherche."
                    });
                    break;
            }
    }
}