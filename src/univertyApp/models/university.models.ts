import { Timestamp } from "@google-cloud/firestore";

export class Student {
    id?: string;
    phone: string | undefined;
    name: string | undefined;
    promotion: string | undefined;
    promotionlabel: string | undefined;

}

export class Promotion {
    private id: string;
    private label: string ;
    private promotion: string;
    constructor(id: string, data: FirebaseFirestore.DocumentData){
        this.id = id;
        this.label = data.label;
        this.promotion = data.pormotion;
    }
    get Id() {
        return this.id ;       
    }
    get Label(){
        return this.label;
    }
    get Promotion() {
        return this.promotion;
    }
    set Id(id: string){
        this.id = id;
    }
    set Label(label: string){
        this.label = label;
    }
    set Promotion(promotion: string){
        this.promotion = promotion
    }
}
export interface PlaningActivity{
    Adctivities: String;
    heure: String;
    minute: String;
}
export class Planing {
    id: String | undefined;
    Adctivities: Array<PlaningActivity> = [];
    dateplan: any;
}

export interface Interrogation{
    cours: string;
    date: Date;
    heuredebut: String;
    label: string;
    promotion: string;
}

export class TP {
    label: string | undefined;
    prix: string | undefined;
    condition: string | undefined;
    cours: string | undefined;
    courslabel: string| undefined;
    datedepot: Timestamp | undefined;
    datedebut: Timestamp | undefined;
    promotion: string | undefined;
}