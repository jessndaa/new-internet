"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const firebase_admin_1 = require("firebase-admin");
const university_models_1 = require("./models/university.models");
const firestore_1 = require("@google-cloud/firestore");
const Utility_1 = require("../Utility");
const univ_utility_1 = require("./univ.utility");
class UniversityApp {
    constructor() { }
    static async storeStudent(req, res, parameters) {
        var fs = firebase_admin_1.firestore();
        var result;
        const user = await this.getIfUserAllReadyExist(req.body.sessionId);
        if (user) {
            res.send({ 'speech': `Si je me souviens bien j'ai déjà enregistrer vos information et je vous connait déjà, ${user.name} en ${user.promotionlabel}` });
            return;
        }
        const promo = univ_utility_1.getPromotionFromTag(req.body.result.parameters.promotion);
        if (!promo) {
            res.send({ 'speech': 'je n\' pas à retrouver votre promotion pour l\'instant... si vous êtes en genie ou gestion informatique veillez preciser svp.' });
        }
        const correctTag = await this.getPromotionId(promo);
        var data = {
            name: req.body.result.parameters.any,
            phone: req.body.sessionId,
            promotion: correctTag.Id,
            promotionlabel: correctTag.Label
        };
        // console.log(data);
        // res.send((correctTag as Promotion).Id)
        try {
            result = await fs.collection("student").add(data);
            if (req.body.result.parameters.any) {
                res.send({
                    "speech": `${req.body.result.parameters.any}, nous avons enregistré vos informations vous pouvez maintenant avoir des information sur votre promotion(${data.promotionlabel}).`
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
                "speech": `nous n'avons enregistré vos veillez reesyer pour continuer.`
            });
        }
    }
    static async getInfoDay(req, res, parameters) {
        var fs = firebase_admin_1.firestore();
        // TODO : change the code in production
        req.body.sessionId = "+243820826571";
        // TODO : change in production
        var student = await this.getStudent(req.body.sessionId);
        var std = new university_models_1.Student();
        if (student == undefined) {
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
        // req.body.sessionId = "+243820826571"
        // TODO : change in production
        let totalMessage = "";
        var student = await this.getStudent(req.body.sessionId);
        if (student) {
            var inter = await fs.collection('promotion')
                .doc(student.promotion)
                .collection('interro')
                .get();
            inter.forEach((val) => {
                totalMessage = "j'ai trouvé que : ";
                if (Utility_1.Utility.compareDate(val.data().dateinterro, firestore_1.Timestamp.now())) {
                    const date = val.data().dateinterro.toDate();
                    const data = val.data();
                    totalMessage += `le ${date.getDay()}-${date.getMonth()}-${date.getFullYear()} il y a interro de ${data.courslabel}`;
                }
            });
        }
        else {
            res.send({ 'speech': `je ne suis pas capable d'identifier votre promotion, indiquer moi votre nom et votre promotion, merci.` });
        }
        res.send({ "speech": totalMessage });
    }
    static async getCoursSyllabusPrice(req, res, parameters) {
        var fs = firebase_admin_1.firestore();
        // TODO : change the code in production
        // req.body.sessionId = "+243820826571"
        // TODO : change in production
        let totalMessage = "";
        let syllabar = req.body.result.parameters.any;
        var student = await this.getStudent(req.body.sessionId);
        var coursOk = univ_utility_1.getCoursFromTag(syllabar, student.promotion);
        if (!coursOk) {
            console.log("ooops it's suck...");
            res.send({ 'speech': `il se peut que vous cherchier un cour qui n'est pas de votre promotion... ` });
            return;
        }
        if (student) {
            var inter = await fs.collection('promotion')
                .doc(student.promotion)
                .collection('syllabus')
                .get();
            inter.forEach((val) => {
                totalMessage = "j'ai trouvé : ";
                if (val.data().courslabel.toLowerCase().trim() === coursOk.toLowerCase()) {
                    const data = val.data();
                    totalMessage += `le prix du syllabus de ${coursOk} est à ${data.price}$`;
                }
            });
        }
        else {
            res.send({ 'speech': `je ne suis pas capable d'identifier votre promotion, indiquer moi votre nom et votre promotion, merci.` });
            return;
        }
        res.send({ "speech": totalMessage });
        return;
    }
    static async getHaveTp(req, res, parameters) {
        var fs = firebase_admin_1.firestore();
        // TODO : change the code in production
        req.body.sessionId = "+243820826571";
        // TODO : change in production
        var student = await this.getStudent(req.body.sessionId);
        var tpRef = undefined;
        if (student) {
            tpRef = await fs.collection("promotion")
                .doc(student.promotion)
                .collection('tp').get();
            var tps;
            var lastTp = new Array();
            tpRef.forEach((e) => {
                tps = e.data();
                console.log(tps.datedepot.toDate());
                console.log(new Date(Date.now()));
                console.log(Utility_1.Utility.compareDate(tps.datedepot, firestore_1.Timestamp.fromDate(new Date(Date.now()))));
                if (Utility_1.Utility.compareDate(tps.datedepot, firestore_1.Timestamp.fromDate(new Date(Date.now())))) {
                    lastTp.push(tps);
                }
            });
            var endMessage = "vous avez tp de : ";
            if (lastTp.length > 0) {
                for (let index = 0; index < lastTp.length; index++) {
                    const element = lastTp[index];
                    const date = element.datedebut.toDate();
                    const dateDepot = element.datedepot.toDate();
                    endMessage = `${endMessage} ${element.courslabel}, debut: ${date.getDay()}-${date.getMonth()}-${date.getFullYear()}, depot: ${dateDepot.getDay()}-${dateDepot.getMonth()}-${dateDepot.getFullYear()} *|* `;
                }
            }
            else {
                endMessage = "vous n'a pas de tp signalé jusque là...";
            }
            res.send({ "speech": endMessage });
        }
    }
    static async getHaveTpWhen(req, res, parameters) {
        var fs = firebase_admin_1.firestore();
        var student = await this.getStudent(req.body.sessionId);
        var cours = req.body.result.parameters.any;
        var totalMessage = '';
        if (student) {
            console.log("ooops :", student);
            var coursOk = univ_utility_1.getCoursFromTag(cours, student.promotion);
            if (!coursOk) {
                res.send({ "speech": "Vous assayez de chercher les informations sur un tp d'un cours qui n'est pas de votre promotion" });
                return;
            }
            console.log(coursOk);
            var getedCours = await fs.collection('promotion')
                .doc(student.promotion)
                .collection('tp').get();
            var counter = 0;
            getedCours.forEach(val => {
                counter++;
            });
            if (counter < 1) {
                res.send({ "speech": `Depuis le début de l'anné vous il n'y pas encore eu un tp de ${coursOk}` });
            }
            else {
                totalMessage = `voici la liste de tp du cours de ${coursOk}: `;
                getedCours.forEach(element => {
                    const data = element.data();
                    if (data.courslabel.toLowerCase().trim() === coursOk.toLowerCase().trim()
                        && Utility_1.Utility.compareDate(data.datedepot, firestore_1.Timestamp.fromDate(new Date(Date.now())))) {
                        const date = data.datedepot.toDate();
                        totalMessage += ` ${data.label} ${date.getDay()}-${date.getMonth()}-${date.getFullYear()}, ${data.condition ? 'conditioné' : ''} *|*`;
                    }
                });
            }
        }
        res.send({ "speech": totalMessage });
    }
    //?It's utility function for simplify the code
    /**
     *
     * @param sessionId the user session id
     */
    static async getStudent(sessionId) {
        //? get rquest promotion
        var fs = firebase_admin_1.firestore();
        console.log("session id:" + sessionId);
        var colProm = await fs.collection("student").where("phone", "==", sessionId).get();
        var student;
        colProm.forEach((e) => {
            console.log("id:" + e.id);
            student = e.data();
        });
        return student;
    }
    static async getPromotionId(name) {
        if (name) {
            var fs = firebase_admin_1.firestore();
            console.log("session name:" + name);
            var colProm = await fs.collection("promotion").where("label", "==", name).get();
            console.log("session name ouf");
            var promo;
            colProm.forEach((e) => {
                console.log("id:" + e.id);
                promo = new university_models_1.Promotion(e.id, e.data());
            });
            return promo;
        }
        return undefined;
    }
    static async getIfUserAllReadyExist(phone) {
        var fs = await firebase_admin_1.firestore().collection('student').get();
        var valor = Array();
        let element;
        fs.docs.forEach((val) => {
            valor.push(Object.assign({ id: val.id }, val.data()));
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
exports.UniversityApp = UniversityApp;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5pdmVyc2l0eS5hcHAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdW5pdmVydHlBcHAvdW5pdmVyc2l0eS5hcHAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSxtREFBMEM7QUFDMUMsa0VBQTJFO0FBQzNFLHVEQUFvRDtBQUNwRCx3Q0FBcUM7QUFDckMsaURBQXVFO0FBQ3ZFO0lBRUksZ0JBQWUsQ0FBQztJQUNULE1BQU0sQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLEdBQW9CLEVBQUUsR0FBcUIsRUFBRSxVQUFlO1FBQ3pGLElBQUksRUFBRSxHQUFHLDBCQUFTLEVBQUUsQ0FBQztRQUNyQixJQUFJLE1BQU0sQ0FBQztRQUNYLE1BQU0sSUFBSSxHQUFHLE1BQU0sSUFBSSxDQUFDLHNCQUFzQixDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDbkUsSUFBSyxJQUFnQixFQUFFO1lBQ25CLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBQyxRQUFRLEVBQUUseUZBQTBGLElBQWdCLENBQUMsSUFBSSxPQUFRLElBQWdCLENBQUMsY0FBYyxFQUFFLEVBQUMsQ0FBQyxDQUFBO1lBQzlLLE9BQU07U0FDVDtRQUNELE1BQU0sS0FBSyxHQUFHLGtDQUFtQixDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN4RSxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ1IsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFDLFFBQVEsRUFBRSwrSEFBK0gsRUFBQyxDQUFDLENBQUE7U0FDeEo7UUFDRCxNQUFNLFVBQVUsR0FBRyxNQUFNLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBZSxDQUFDLENBQUM7UUFFOUQsSUFBSSxJQUFJLEdBQUc7WUFDUCxJQUFJLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEdBQUc7WUFDcEMsS0FBSyxF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