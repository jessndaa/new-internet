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
            res.json({"displayText": "this text is displayed visually"});
       
    }
}

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