import express from 'express';
import * as apiai from 'apiai';
import fetch from 'node-fetch';
import cheerio from 'cheerio';
var app = apiai.default("4fa7646395134bb8a2a59fa2f5f78f4a");
import {firestore } from "firebase-admin";
import {Student, Promotion, Planing} from './models/university.models';
import { Timestamp } from '@google-cloud/firestore';


export class Simple {
    public static async index(req: express.Request, res: express.Response)  {
        var request = app.textRequest(req.body.message, {
            sessionId: req.body.phone
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
            let intent = req.body.result.metadata.intentName;
            console.log("ooooops")
            try {
                switch (intent) {
                    case "wiki.about.person":
                        Simple.fetchWikiPerson(req, res, parameters);
                        break;
                    case "web.media.info":
                        Simple.fetchMediaCongo(req, res, parameters)
                        break;
                    case "univ.info.day":
                        Simple.getInfoDay(req, res, parameters)
                        break;
                    default:
                        res.end({
                            "speech": "Nous n'avons pas d'information sur votre recherche."
                        });
                        break;
                }                
            } catch (error) {
                res.end({
                    "speech": "Nous n'avons pas d'information sur votre recherche."
                });
            }


    }

    private static fetchWikiPerson(req: express.Request, res: express.Response, parameters: any) {
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
    
    private static async getInfoDay(req: express.Request, res: express.Response, parameters: any) {
        var fs = firestore();
        req.body.sessionId = "+234820826571"
        var student = await fs.collection("student").where("phone", "==", req.body.sessionId).get();
        var std = new Student();
        student.forEach((value)=>{
          std =  value.data() as Student;
        });
        if (student.size < 1) {
            res.send({
                "speech": "Desolé mais je n'arrive pas à touver votre universite est votre promotion, svp veuillez m'indiquer votre université, votre promotion ainsi que, votre nom svp :)"
            })
            return
        } 
        var planing = await fs.collection("school-planing").where("promotiom", "==", std.promotion).get();
        var plan = new Planing();
        planing.forEach((val)=>{
            plan = val.data() as Planing;
        })
        var smsReverse = "J'ai trouvé que aujourd'hui il y a: ";
        if (plan.Adctivities.length < 1) {
            smsReverse = "J'ai pas trouvé d'information sur votre promotion pour journné d'aujourd'hui ";
            console.log(plan.Adctivities);
        }
        else{
            plan.Adctivities.forEach((value)=>{
                smsReverse += value.Adctivities + ` à ${value.heure} : ${value.minute}, `
            })
        }
        res.send({"speech": smsReverse});
    }

    private static fetchMediaCongo(req: express.Request, res: express.Response, parameters: any){
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