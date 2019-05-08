import express from 'express';
import {firestore } from "firebase-admin";
import {Student, Promotion, Planing, TP} from './models/university.models';
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
            if(req.body.result.parameters.any){
                res.send({
                    "speech": `${req.body.result.parameters.any}, nous avons enregistré vos informations vous pouvez maintenant avoir des information sur votre promotion(${req.body.result.parameters.promotion}).`
                }); 
            }
            else if (req.body.result.parameters.promotion){
                res.send({
                    "speech": `nous avons enregistré vos informations vous pouvez maintenant avoir des information sur votre promotion(${req.body.result.parameters.promotion}).`
                });                
            }
            else {
                res.send({
                    "speech": `nous n'avons enregistré vos veillez reesyer et continuer.`
                })
            }
   
        } catch (error) {
            res.send({
                "speech": `nous n'avons enregistré vos veillez reesyer et continuer.`
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
            });
        }
        res.send({"speech": smsReverse});
    }


    /**
     * 
     * @param req 
     * @param res 
     * @param parameters 
     * get information about all interrogation for more felexible trikcs and ticks
     */

    public static async getInterroDate(req: express.Request, res: express.Response, parameters: any) {
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
        var planing = await fs.collection("interogation").where("promotiom", "==", std.promotion).get();
        var plan = new Planing();
        planing.forEach((val)=>{
            plan = val.data() as Planing;
        })


        // TODO : check interrogation response from rachel
        var smsReverse = "selon le ";
        if (plan.Adctivities.length < 1) {
            smsReverse = "J'ai pas trouvé d'information sur votre promotion pour journné d'aujourd'hui ";
            console.log(plan.Adctivities);
        }
        else{
            plan.Adctivities.forEach((value)=>{
                smsReverse += value.Adctivities + ` à ${value.heure} : ${value.minute}, `
            });
        }
        res.send({"speech": smsReverse});
    }

    public static async getHaveTp(req: express.Request, res: express.Response, parameters: any) {
        var fs = firestore();

        // TODO : change the code in production
        req.body.sessionId = "+243820826571"
        // TODO : change in production

        
        console.log('ooops');
        
        var student = await this.getStudent(req.body.sessionId);

        var tpRef = await fs.collection("tp").where("promotion", "==", student.promotion ).get();
        var tps: TP;
        var lastTp: Array<TP> = new Array<TP>();
        
        tpRef.forEach((e)=>{
           tps = e.data() as TP;
           if ((tps.datedepot as Date).getDate() > Date.now()) {
               lastTp.push(tps)
           }
        });
        var endMessage = "vous avez tp de :";
        if (lastTp.length > 0) {
            for (let index = 0; index < lastTp.length; index++) {
                const element = lastTp[index];
                endMessage= `${endMessage} ${element.cours}, debut: ${element.datedebut}, depot: ${element.datedepot} *|* `;  
            }           
        }
        else{
            endMessage = "vous n'a pas de tp signalé jusque là..."
        }
        
        res.send({"speech": endMessage});
    }

    private static async getStudent(sessionId: string) {
                //? get rquest promotion
        var fs = firestore();
        console.log("session id:" + sessionId);
        var colProm = await fs.collection("student").where("phone", "==", sessionId).get();
        console.log(colProm.docs);
        
        var student;
        colProm.forEach((e)=>{
            console.log("id:" + e.id);
            student = e.data() as Student;
        })
        return (student as unknown as Student)
    }
}