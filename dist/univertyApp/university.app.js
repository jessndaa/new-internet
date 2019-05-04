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
                "speech": `${req.body.result.parameters.any}, nous avons enregistré vos informations vous pouvez maintenant avoir des information sur votre promotion.`
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5pdmVyc2l0eS5hcHAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdW5pdmVydHlBcHAvdW5pdmVyc2l0eS5hcHAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSxtREFBMEM7QUFDMUMsa0VBQXVFO0FBQ3ZFO0lBRUksZ0JBQWUsQ0FBQztJQUNULE1BQU0sQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLEdBQW9CLEVBQUUsR0FBcUIsRUFBRSxVQUFlO1FBQ3pGLElBQUksRUFBRSxHQUFHLDBCQUFTLEVBQUUsQ0FBQztRQUNyQixJQUFJLE1BQU0sQ0FBQztRQUNYLElBQUksSUFBSSxHQUFHO1lBQ1AsR0FBRyxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxHQUFHO1lBQ25DLEtBQUssRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVM7WUFDekIsU0FBUyxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxTQUFTO1NBQ2xELENBQUM7UUFDRixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRWxCLElBQUk7WUFDQSxNQUFNLEdBQUcsTUFBTSxFQUFFLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNsRCxHQUFHLENBQUMsSUFBSSxDQUFDO2dCQUNMLFFBQVEsRUFBRSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxHQUFHLDRHQUE0RzthQUMxSixDQUFDLENBQUM7U0FDTjtRQUFDLE9BQU8sS0FBSyxFQUFFO1lBQ1osR0FBRyxDQUFDLElBQUksQ0FBQztnQkFDTCxRQUFRLEVBQUUsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsR0FBRyw2REFBNkQ7YUFDM0csQ0FBQyxDQUFBO1NBQ0w7SUFJTCxDQUFDO0lBQ00sTUFBTSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsR0FBb0IsRUFBRSxHQUFxQixFQUFFLFVBQWU7UUFDdkYsSUFBSSxFQUFFLEdBQUcsMEJBQVMsRUFBRSxDQUFDO1FBRXJCLHVDQUF1QztRQUN2QyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxlQUFlLENBQUE7UUFDcEMsOEJBQThCO1FBRTlCLElBQUksT0FBTyxHQUFHLE1BQU0sRUFBRSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQzVGLElBQUksR0FBRyxHQUFHLElBQUksMkJBQU8sRUFBRSxDQUFDO1FBQ3hCLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUMsRUFBRTtZQUN2QixHQUFHLEdBQUksS0FBSyxDQUFDLElBQUksRUFBYSxDQUFDO1FBQ2pDLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxPQUFPLENBQUMsSUFBSSxHQUFHLENBQUMsRUFBRTtZQUNsQixHQUFHLENBQUMsSUFBSSxDQUFDO2dCQUNMLFFBQVEsRUFBRSxrS0FBa0s7YUFDL0ssQ0FBQyxDQUFBO1lBQ0YsT0FBTTtTQUNUO1FBQ0QsSUFBSSxPQUFPLEdBQUcsTUFBTSxFQUFFLENBQUMsVUFBVSxDQUFDLGdCQUFnQixDQUFDLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRSxJQUFJLEVBQUUsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ2xHLElBQUksSUFBSSxHQUFHLElBQUksMkJBQU8sRUFBRSxDQUFDO1FBQ3pCLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLEVBQUMsRUFBRTtZQUNuQixJQUFJLEdBQUcsR0FBRyxDQUFDLElBQUksRUFBYSxDQUFDO1FBQ2pDLENBQUMsQ0FBQyxDQUFBO1FBQ0YsSUFBSSxVQUFVLEdBQUcsc0NBQXNDLENBQUM7UUFDeEQsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDN0IsVUFBVSxHQUFHLCtFQUErRSxDQUFDO1lBQzdGLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1NBQ2pDO2FBQ0c7WUFDQSxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBQyxFQUFFO2dCQUM5QixVQUFVLElBQUksS0FBSyxDQUFDLFdBQVcsR0FBRyxNQUFNLEtBQUssQ0FBQyxLQUFLLE1BQU0sS0FBSyxDQUFDLE1BQU0sSUFBSSxDQUFBO1lBQzdFLENBQUMsQ0FBQyxDQUFBO1NBQ0w7UUFDRCxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUMsUUFBUSxFQUFFLFVBQVUsRUFBQyxDQUFDLENBQUM7SUFDckMsQ0FBQztDQUNKO0FBOURELHNDQThEQyJ9