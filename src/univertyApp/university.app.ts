import express from 'express';
import {firestore } from "firebase-admin";
import {Student, Promotion, Planing, TP} from './models/university.models';
import { Timestamp } from '@google-cloud/firestore';
import { Utility } from '../Utility';
import {  getPromotionFromTag, getCoursFromTag } from './univ.utility';
export class UniversityApp {

    constructor() {}
    public static async storeStudent(req: express.Request, res: express.Response, parameters: any){
        var fs = firestore();
        var result;
        const user = await this.getIfUserAllReadyExist(req.body.sessionId);
        if ((user as Student)) {
            res.send({'speech': `Si je me souviens bien j'ai déjà enregistrer vos information et je vous connait déjà, ${(user as Student).name} en ${(user as Student).promotionlabel}`})
            return
        }
        const promo = getPromotionFromTag(req.body.result.parameters.promotion);
        if (!promo) {
            res.send({'speech': 'je n\' pas à retrouver votre promotion pour l\'instant... si vous êtes en genie ou gestion informatique veillez preciser svp.'})
        }
        const correctTag = await this.getPromotionId(promo as string);

        var data = {
            name: req.body.result.parameters.any,
            phone: req.body.sessionId,
            promotion: (correctTag as Promotion).Id,
            promotionlabel: (correctTag as Promotion).Label
        };
        // console.log(data);
        // res.send((correctTag as Promotion).Id)
        try {
            result = await fs.collection("student").add(data);
            if(req.body.result.parameters.any){
                res.send({
                    "speech": `${req.body.result.parameters.any}, nous avons enregistré vos informations vous pouvez maintenant avoir des information sur votre promotion(${data.promotionlabel}).`
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
                "speech": `nous n'avons enregistré vos veillez reesyer pour continuer.`
            })
        }   
    }
    public static async getInfoDay(req: express.Request, res: express.Response, parameters: any) {
        var fs = firestore();

        // TODO : change the code in production
        req.body.sessionId = "+243820826571"
        // TODO : change in production

        var student = await this.getStudent(req.body.sessionId);
        var std = new Student();
        
        if (student == undefined) {
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
        // req.body.sessionId = "+243820826571"
        // TODO : change in production
        let totalMessage = ""
        var student = await this.getStudent(req.body.sessionId);
        if (student) {
            var inter = await fs.collection('promotion')
                                .doc(student.promotion)
                                .collection('interro')
                                .get();
            inter.forEach((val)=>{
                totalMessage = "j'ai trouvé que : ";
                if (Utility.compareDate((val.data().dateinterro as Timestamp), Timestamp.now())) {
                    const date= (val.data().dateinterro as Timestamp).toDate();
                    const data = val.data();
                    totalMessage += `le ${date.getDay()}-${date.getMonth()}-${date.getFullYear()} il y a interro de ${data.courslabel}`
                }
            });
        }
        else{
            res.send({'speech': `je ne suis pas capable d'identifier votre promotion, indiquer moi votre nom et votre promotion, merci.`})
        }
        res.send({"speech": totalMessage});
    }

    public static async getCoursSyllabusPrice(req: express.Request, res: express.Response, parameters: any) {
        var fs = firestore();
        // TODO : change the code in production
        // req.body.sessionId = "+243820826571"
        // TODO : change in production
        let totalMessage = ""
        let syllabar = req.body.result.parameters.any;
        var student = await this.getStudent(req.body.sessionId);
        var coursOk = getCoursFromTag(syllabar, (student as Student).promotion as string);
        if (!coursOk) {
            console.log("ooops it's suck...");
            
            res.send({'speech': `il se peut que vous cherchier un cour qui n'est pas de votre promotion... `});
            return
        }
        if (student) {
            var inter = await fs.collection('promotion')
                                .doc(student.promotion)
                                .collection('syllabus')
                                .get();
            inter.forEach((val)=>{
                totalMessage = "j'ai trouvé : ";
                if (val.data().courslabel.toLowerCase().trim() === (coursOk as string).toLowerCase()) {
                    const data = val.data();
                    totalMessage += `le prix du syllabus de ${coursOk} est à ${data.price}$`
                }
            });
        }
        else{
            res.send({'speech': `je ne suis pas capable d'identifier votre promotion, indiquer moi votre nom et votre promotion, merci.`})
            return;
        }
        res.send({"speech": totalMessage});
        return;
    }

    public static async getHaveTp(req: express.Request, res: express.Response, parameters: any) {
        var fs = firestore();

        // TODO : change the code in production
        req.body.sessionId = "+243820826571"
        // TODO : change in production

        var student = await this.getStudent(req.body.sessionId);
        var tpRef = undefined;
        if (student) {
            tpRef = await fs.collection("promotion")
            .doc(student.promotion)
            .collection('tp').get();
            var tps: TP;
            var lastTp: Array<TP> = new Array<TP>();
             
            tpRef.forEach((e)=>{
               tps = e.data() as TP;
               console.log((tps.datedepot as Timestamp).toDate());
               console.log( new Date(Date.now()));
               console.log(Utility.compareDate(tps.datedepot as Timestamp, Timestamp.fromDate(new Date(Date.now())) ));
               
               if (Utility.compareDate(tps.datedepot as Timestamp, Timestamp.fromDate(new Date(Date.now())))) {
                   lastTp.push(tps)
               }
            });
            var endMessage = "vous avez tp de : ";
            if (lastTp.length > 0) {
                for (let index = 0; index < lastTp.length; index++) {
                    const element = lastTp[index];
                    const date: Date = (element.datedebut as Timestamp).toDate();
                    const dateDepot: Date = (element.datedepot as Timestamp).toDate();
                    endMessage= `${endMessage} ${element.courslabel}, debut: ${date.getDay()}-${date.getMonth()}-${date.getFullYear()}, depot: ${dateDepot.getDay()}-${dateDepot.getMonth()}-${dateDepot.getFullYear()} *|* `;  
                }           
            }
            else{
                endMessage = "vous n'a pas de tp signalé jusque là..."
            }
            
            res.send({"speech": endMessage});
        }
    }

    public static async getHaveTpWhen(req: express.Request, res: express.Response, parameters: any) {
        var fs = firestore();
        var student = await this.getStudent(req.body.sessionId);
        var cours = req.body.result.parameters.any;
        var totalMessage = '';
        if (student) {
            console.log("ooops :", student);
            
            var coursOk = getCoursFromTag(cours, (student.promotion as string));
            if (!coursOk) {
                res.send({"speech": "Vous assayez de chercher les informations sur un tp d'un cours qui n'est pas de votre promotion"});
                return
            }
            console.log(coursOk);
            
            var getedCours = await fs.collection('promotion')
                .doc(student.promotion as string)
                .collection('tp').get();
                var counter = 0;
                getedCours.forEach(val => {
                    counter++;
                })
                
                if(counter < 1){
                    res.send({"speech" : `Depuis le début de l'anné vous il n'y pas encore eu un tp de ${coursOk}`});
                }
                else{
                    totalMessage = `voici la liste de tp du cours de ${coursOk}: `
                    getedCours.forEach(element => {
                        const data = element.data();
                        if (data.courslabel.toLowerCase().trim() === (coursOk as string).toLowerCase().trim() 
                            &&  Utility.compareDate(data.datedepot as Timestamp, Timestamp.fromDate(new Date(Date.now())))) {
                            const date = (data.datedepot as Timestamp).toDate();
                                totalMessage += ` ${data.label} ${date.getDay()}-${date.getMonth()}-${date.getFullYear()}, ${data.condition ?'conditioné' : ''} *|*`
                        }       
                    });
                }
        }
        res.send({"speech" : totalMessage});

        
    }

    //?It's utility function for simplify the code
    /**
     * 
     * @param sessionId the user session id
     */
    private static async getStudent(sessionId: string) {
                //? get rquest promotion
        var fs = firestore();
        console.log("session id:" + sessionId);
        var colProm = await fs.collection("student").where("phone", "==", sessionId).get();
        
        var student;
        colProm.forEach((e)=>{
            console.log("id:" + e.id);
            student = e.data() as Student;
        })
        return (student as Student | undefined)
    }
    private static async getPromotionId(name: string): Promise<Promotion | undefined>{
        if (name) {
            var fs = firestore();
            console.log("session name:" + name);
            var colProm = await fs.collection("promotion").where("label", "==", name).get();
            console.log("session name ouf");
            var promo;
            colProm.forEach((e)=>{
                console.log("id:"+ e.id);
                
                promo = new Promotion(e.id, e.data())
            })
            return (promo as Promotion | undefined);            
        }
        return undefined;
        
    }
    private static async getIfUserAllReadyExist(phone: string): Promise<Student | undefined>{
            var fs = await firestore().collection('student').get();
            var valor: Array<any> = Array<any>();
            let element:any;
            fs.docs.forEach((val) => {
                valor.push({
                   id : val.id,
                   ...val.data()
                })
            });

            for (let index = 0; index < valor.length; index++) {
                element = valor[index];
                if (element.phone === phone) {
                    return valor[index];
                }
                element = undefined;
                
            }
            return element;
    }
}