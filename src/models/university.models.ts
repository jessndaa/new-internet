export class Student {
    phone: String | undefined;
    pame: String | undefined;
    promotion: String | undefined;
}

export class Promotion {
    id: String | undefined;
    label: String | undefined;
    pormotion: String | undefined;
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