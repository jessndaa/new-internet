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
            res.send({
                "speech": `${req.body.result.parameters.any}, nous avons enregistré vos informations vous pouvez maintenant avoir des information sur votre promotion(${req.body.result.parameters.promotion}).`
            });
        }
        catch (error) {
            res.send({
                "speech": `${req.body.result.parameters.any}, nous n'avons enregistré vos veillez reesyer et continuer.`
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
}
exports.UniversityApp = UniversityApp;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5pdmVyc2l0eS5hcHAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdW5pdmVydHlBcHAvdW5pdmVyc2l0eS5hcHAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSxtREFBMEM7QUFDMUMsa0VBQXVFO0FBQ3ZFO0lBRUksZ0JBQWUsQ0FBQztJQUNULE1BQU0sQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLEdBQW9CLEVBQUUsR0FBcUIsRUFBRSxVQUFlO1FBQ3pGLElBQUksRUFBRSxHQUFHLDBCQUFTLEVBQUUsQ0FBQztRQUNyQixJQUFJLE1BQU0sQ0FBQztRQUNYLElBQUksSUFBSSxHQUFHO1lBQ1AsR0FBRyxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxHQUFHO1lBQ25DLEtBQUssRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVM7WUFDekIsU0FBUyxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxTQUFTO1NBQ2xELENBQUM7UUFDRixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRWxCLElBQUk7WUFDQSxNQUFNLEdBQUcsTUFBTSxFQUFFLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNsRCxHQUFHLENBQUMsSUFBSSxDQUFDO2dCQUNMLFFBQVEsRUFBRSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxHQUFHLDZHQUE2RyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsU0FBUyxJQUFJO2FBQ25NLENBQUMsQ0FBQztTQUNOO1FBQUMsT0FBTyxLQUFLLEVBQUU7WUFDWixHQUFHLENBQUMsSUFBSSxDQUFDO2dCQUNMLFFBQVEsRUFBRSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxHQUFHLDZEQUE2RDthQUMzRyxDQUFDLENBQUE7U0FDTDtJQUlMLENBQUM7SUFDTSxNQUFNLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxHQUFvQixFQUFFLEdBQXFCLEVBQUUsVUFBZTtRQUN2RixJQUFJLEVBQUUsR0FBRywwQkFBUyxFQUFFLENBQUM7UUFFckIsdUNBQXVDO1FBQ3ZDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLGVBQWUsQ0FBQTtRQUNwQyw4QkFBOEI7UUFFOUIsSUFBSSxPQUFPLEdBQUcsTUFBTSxFQUFFLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDNUYsSUFBSSxHQUFHLEdBQUcsSUFBSSwyQkFBTyxFQUFFLENBQUM7UUFDeEIsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBQyxFQUFFO1lBQ3ZCLEdBQUcsR0FBSSxLQUFLLENBQUMsSUFBSSxFQUFhLENBQUM7UUFDakMsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLE9BQU8sQ0FBQyxJQUFJLEdBQUcsQ0FBQyxFQUFFO1lBQ2xCLEdBQUcsQ0FBQyxJQUFJLENBQUM7Z0JBQ0wsUUFBUSxFQUFFLGtLQUFrSzthQUMvSyxDQUFDLENBQUE7WUFDRixPQUFNO1NBQ1Q7UUFDRCxJQUFJLE9BQU8sR0FBRyxNQUFNLEVBQUUsQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFLElBQUksRUFBRSxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDbEcsSUFBSSxJQUFJLEdBQUcsSUFBSSwyQkFBTyxFQUFFLENBQUM7UUFDekIsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsRUFBQyxFQUFFO1lBQ25CLElBQUksR0FBRyxHQUFHLENBQUMsSUFBSSxFQUFhLENBQUM7UUFDakMsQ0FBQyxDQUFDLENBQUE7UUFDRixJQUFJLFVBQVUsR0FBRyxzQ0FBc0MsQ0FBQztRQUN4RCxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUM3QixVQUFVLEdBQUcsK0VBQStFLENBQUM7WUFDN0YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7U0FDakM7YUFDRztZQUNBLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxFQUFDLEVBQUU7Z0JBQzlCLFVBQVUsSUFBSSxLQUFLLENBQUMsV0FBVyxHQUFHLE1BQU0sS0FBSyxDQUFDLEtBQUssTUFBTSxLQUFLLENBQUMsTUFBTSxJQUFJLENBQUE7WUFDN0UsQ0FBQyxDQUFDLENBQUE7U0FDTDtRQUNELEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBQyxRQUFRLEVBQUUsVUFBVSxFQUFDLENBQUMsQ0FBQztJQUNyQyxDQUFDO0NBQ0o7QUE5REQsc0NBOERDIn0=