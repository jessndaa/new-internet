import express from 'express';
import {firestore } from "firebase-admin";
import {Student, Promotion, Planing} from './models/university.models';
export class UniversityApp {

    constructor() {}
    public static async storeStudent(req: express.Request, res: express.Response, parameters: any){
        var fs = firestore();
        var result;
        var data = {
            nom: req.body.result.parameters.any,
            phone: req.body.sessionId,
            promotion: req.body.result.parameters.promotion
        };
        console.log(data);
        
        try {
            result = await fs.collection("student").add(data);
            res.send({
                "speech": `${req.body.result.parameters.any}, nous avons enregistré vos informations vous pouvez maintenant avoir des information sur votre promotion(${req.body.result.parameters.promotion}).`
            });    
        } catch (error) {
            res.send({
                "speech": `${req.body.result.parameters.any}, nous n'avons enregistré vos veillez reesyer et continuer.`
            })
        }   


            
    }
    public static async getInfoDay(req: express.Request, res: express.Response, parameters: any) {
        var fs = firestore();

        // TODO : change the code in production
        req.body.sessionId = "+243820826571"
        // TODO : change in production

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
}