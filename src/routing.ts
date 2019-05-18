import express from 'express';
import * as apiai from 'apiai';
import fetch from 'node-fetch';
import cheerio from 'cheerio';
var app = apiai.default("4fa7646395134bb8a2a59fa2f5f78f4a");
import {firestore, auth,  } from "firebase-admin";
import {Student, Promotion, Planing} from './univertyApp/models/university.models';
import { UniversityApp } from './univertyApp/university.app';
import { WikipediaApp } from './wikipediaApp/wikipedia.app';
import { MediaApp } from './media.app/media.app';

export class Simple {
    public static async index(req: express.Request, res: express.Response)  {
        var request = app.textRequest(req.body.message, {
            sessionId: req.body.phone
        });
        
        // firestore().collection('message').add({
        //     phone: req.body.phone,
        //     messae: req.body.message
        // }).then(e => {
        //     firestore().doc('message-info')
        //     .set({
        //         number_sended: 
        //     })
        // });
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
            try {
                switch (intent) {
                    case "wiki.about.person":
                        WikipediaApp.fetchWikiPerson(req, res, parameters);
                        break;
                    case "web.media.info":
                        MediaApp.fetchMediaCongo(req, res, parameters)
                        break;
                    case "univ.info.day":
                        UniversityApp.getInfoDay(req, res, parameters)
                        break;
                    case "univ.student.present.all":
                        await UniversityApp.storeStudent(req, res, parameters)
                        break;
                    case "univ.promotion.interro.all.when":
                        await UniversityApp.getInterroDate(req, res, parameters)
                        break;
                    case "univ.promotion.syllabus.price":
                        await UniversityApp.getCoursSyllabusPrice(req, res, parameters)
                        break;
                    case "univ.promotion.inetrrogation.cours.when":
                        await UniversityApp.getInterroDate(req, res, parameters)
                        break;
                    case "univ.promotion.tp.about":
                        await UniversityApp.getHaveTp(req, res, parameters)
                        break;
                    case "univ.promotion.tp.depot.when":
                        await UniversityApp.getHaveTpWhen(req, res, parameters)
                        break;
                    default:
                        res.json({
                            "speech": "Nous n'avons pas d'information sur votre recherche."
                        });
                        break;
                }                
            } catch (error) {
                throw error;
                
                // res.json({
                //     "speech":error.message
                // });
            }
    }
}