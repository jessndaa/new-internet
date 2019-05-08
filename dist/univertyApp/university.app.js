"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const firebase_admin_1 = require("firebase-admin");
const university_models_1 = require("./models/university.models");
class UniversityApp {
    constructor() { }
    static async storeStudent(req, res, parameters) {
        var fs = firebase_admin_1.firestore();
        var result;
        var data = {
            nom: req.body.result.parameters.any,
            phone: req.body.sessionId,
            promotion: req.body.result.parameters.promotion
        };
        console.log(data);
        try {
            result = await fs.collection("student").add(data);
            if (req.body.result.parameters.any) {
                res.send({
                    "speech": `${req.body.result.parameters.any}, nous avons enregistré vos informations vous pouvez maintenant avoir des information sur votre promotion(${req.body.result.parameters.promotion}).`
                });
            }
            else if (req.body.result.parameters.promotion) {
                res.send({
                    "speech": `nous avons enregistré vos informations vous pouvez maintenant avoir des information sur votre promotion(${req.body.result.parameters.promotion}).`
                });
            }
            else {
                res.send({
                    "speech": `nous n'avons enregistré vos veillez reesyer et continuer.`
                });
            }
        }
        catch (error) {
            res.send({
                "speech": `nous n'avons enregistré vos veillez reesyer et continuer.`
            });
        }
    }
    static async getInfoDay(req, res, parameters) {
        var fs = firebase_admin_1.firestore();
        // TODO : change the code in production
        req.body.sessionId = "+243820826571";
        // TODO : change in production
        var student = await fs.collection("student").where("phone", "==", req.body.sessionId).get();
        var std = new university_models_1.Student();
        student.forEach((value) => {
            std = value.data();
        });
        if (student.size < 1) {
            res.send({
                "speech": "Desolé mais je n'arrive pas à touver votre universite est votre promotion, svp veuillez m'indiquer votre université, votre promotion ainsi que, votre nom svp :)"
            });
            return;
        }
        var planing = await fs.collection("school-planing").where("promotiom", "==", std.promotion).get();
        var plan = new university_models_1.Planing();
        planing.forEach((val) => {
            plan = val.data();
        });
        var smsReverse = "J'ai trouvé que aujourd'hui il y a: ";
        if (plan.Adctivities.length < 1) {
            smsReverse = "J'ai pas trouvé d'information sur votre promotion pour journné d'aujourd'hui ";
            console.log(plan.Adctivities);
        }
        else {
            plan.Adctivities.forEach((value) => {
                smsReverse += value.Adctivities + ` à ${value.heure} : ${value.minute}, `;
            });
        }
        res.send({ "speech": smsReverse });
    }
    /**
     *
     * @param req
     * @param res
     * @param parameters
     * get information about all interrogation for more felexible trikcs and ticks
     */
    static async getInterroDate(req, res, parameters) {
        var fs = firebase_admin_1.firestore();
        // TODO : change the code in production
        req.body.sessionId = "+243820826571";
        // TODO : change in production
        var student = await fs.collection("student").where("phone", "==", req.body.sessionId).get();
        var std = new university_models_1.Student();
        student.forEach((value) => {
            std = value.data();
        });
        if (student.size < 1) {
            res.send({
                "speech": "Desolé mais je n'arrive pas à touver votre universite est votre promotion, svp veuillez m'indiquer votre université, votre promotion ainsi que, votre nom svp :)"
            });
            return;
        }
        var planing = await fs.collection("interogation").where("promotiom", "==", std.promotion).get();
        var plan = new university_models_1.Planing();
        planing.forEach((val) => {
            plan = val.data();
        });
        // TODO : check interrogation response from rachel
        var smsReverse = "selon le ";
        if (plan.Adctivities.length < 1) {
            smsReverse = "J'ai pas trouvé d'information sur votre promotion pour journné d'aujourd'hui ";
            console.log(plan.Adctivities);
        }
        else {
            plan.Adctivities.forEach((value) => {
                smsReverse += value.Adctivities + ` à ${value.heure} : ${value.minute}, `;
            });
        }
        res.send({ "speech": smsReverse });
    }
    static async getHaveTp(req, res, parameters) {
        var fs = firebase_admin_1.firestore();
        // TODO : change the code in production
        req.body.sessionId = "+243820826571";
        // TODO : change in production
        console.log('ooops');
        var student = await this.getStudent(req.body.sessionId);
        var tpRef = await fs.collection("tp").where("promotion", "==", student.promotion).get();
        var tps;
        var lastTp = new Array();
        tpRef.forEach((e) => {
            tps = e.data();
            if (tps.datedepot.getDate() > Date.now()) {
                lastTp.push(tps);
            }
        });
        var endMessage = "vous avez tp de :";
        if (lastTp.length > 0) {
            for (let index = 0; index < lastTp.length; index++) {
                const element = lastTp[index];
                endMessage = `${endMessage} ${element.cours}, debut: ${element.datedebut}, depot: ${element.datedepot} *|* `;
            }
        }
        else {
            endMessage = "vous n'a pas de tp signalé jusque là...";
        }
        res.send({ "speech": endMessage });
    }
    static async getStudent(sessionId) {
        //? get rquest promotion
        var fs = firebase_admin_1.firestore();
        console.log("session id:" + sessionId);
        var colProm = await fs.collection("student").where("phone", "==", sessionId).get();
        console.log(colProm.docs);
        var student;
        colProm.forEach((e) => {
            console.log("id:" + e.id);
            student = e.data();
        });
        return student;
    }
}
exports.UniversityApp = UniversityApp;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5pdmVyc2l0eS5hcHAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdW5pdmVydHlBcHAvdW5pdmVyc2l0eS5hcHAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSxtREFBMEM7QUFDMUMsa0VBQTJFO0FBQzNFO0lBRUksZ0JBQWUsQ0FBQztJQUNULE1BQU0sQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLEdBQW9CLEVBQUUsR0FBcUIsRUFBRSxVQUFlO1FBQ3pGLElBQUksRUFBRSxHQUFHLDBCQUFTLEVBQUUsQ0FBQztRQUNyQixJQUFJLE1BQU0sQ0FBQztRQUNYLElBQUksSUFBSSxHQUFHO1lBQ1AsR0FBRyxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxHQUFHO1lBQ25DLEtBQUssRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVM7WUFDekIsU0FBUyxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxTQUFTO1NBQ2xELENBQUM7UUFDRixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRWxCLElBQUk7WUFDQSxNQUFNLEdBQUcsTUFBTSxFQUFFLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNsRCxJQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUM7Z0JBQzlCLEdBQUcsQ0FBQyxJQUFJLENBQUM7b0JBQ0wsUUFBUSxFQUFFLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEdBQUcsNkdBQTZHLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxTQUFTLElBQUk7aUJBQ25NLENBQUMsQ0FBQzthQUNOO2lCQUNJLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMs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