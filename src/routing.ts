import express from 'express';
import * as apiai from 'apiai';

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


}

