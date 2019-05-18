

export var getPromotionFromTag = (val: string): string | undefined=>{
    for (const key in promotionTag) {
        const tag = promotionTag[key] as string[];
        for (let index = 0; index < tag.length; index++) {
            console.log(tag[index] + '===' + val, tag[index].toLowerCase() === val.toLowerCase());
            
            if (tag[index].toLowerCase() === val.toLowerCase()) {
                return key;
            }
            
        }    
    }
    return undefined;
}
export var getCoursFromTag = (val: string, promotion: string): string | undefined=>{
    const coursT = coursTag[promotion];
    for (const key in coursT) {
        const tag = coursT[key] as string[];
        for (let index = 0; index < tag.length; index++) {
            console.log(tag[index] + '===' + val, tag[index].toLowerCase() === val.toLowerCase());
            
            if (tag[index].toLowerCase() === val.toLowerCase()) {
                return key;
            }
            
        }    
    }
    return undefined;
}

export var getRandomPhrases = (list: Array<string>)=>{
    const seed = Math.floor(list.length * Math.random());
    return list[seed];
}
/** 
 * promption tag value
 * style : {
 *  'name': ['tags']
 * }
 */

 var coursTag: any  = {
    "HGQqallpvFZ5rGqjW8NH":{
        'Génie Logiciel': [
            'genie logiciel',
            'genie logiciel et const. des progr.',
            'Génie Logiciel',
            'geni logiciel',
            'géni logiciel'
        ],

        'Introduction aux automates': [
            'automat',
            'automath',
            'Introduction aux automates',
            'Introduction aux automate',
            'Introduction au automate',
            'Introduction au automates',
            'Introduction aux automat',
        ],
        'langages formels et compilation': [
            'compilation',
            'langages formels et compilation',
        ],
        'systeme d\'information et bases de données': [
            'base de données',
            'bases de données',
            'BD',
            'systeme d\'information',
            'SI',
            'base des données',
            'base de donnés',
            'base de donné',
            'base de donne',
            'systeme d\'information et bases de données'
        ],
        'algorithmique et structure de données': [
            'algo',
            'algorithmique',
            'algorithme',
            'algoritme'
        ],
        'systeme d\'objets repartis': [
            'BD repartis',
            'base de données repartis',
            'BD reparti',
            'base de données reparti',
            'base de donné repartis',
            'base de donnee repartis',
            'base de donnees repartis',
            'base de donnes repartis',
            'base de donne repartis',
            'base de donne reparti',
            'base de donnee reparti',
            'systeme d\'objets repartis',
            'systeme d\'objet reparti',
            'systeme d\'objet repartis'
        ],
        'conception des systemes d\'information': [
            'conception',
            'conception des systemes d\'information',
        ],
        'intelligence artificielle': [
            'intelligence artificielle',
            'ia',
            'systeme expert',
            'system expert',
            'systeme expert',
            'intelligence artificiele',
            'intelligence artificiel',
            'inteligence artificielle',
            'inteligence artificiel'
        ],
        'architecture des systemes téléinformatiques': [
            'archi',
            'architecture',
            'architecture des systemes téléinformatiques',
        ],
        'calculabilité': [
            'calculabilité',
            'calculabilite'
        ]

    }
}

/**
 * cours contrainte
 */
var promotionTag: any  = {
    "G1 informatique": [
        "g1 informatique",
        "g1 info",
        'g1 math info',
        'g1 math-info',
        'g1 mathematique informatique',
        'g1info',
        'g1informatique',
        'premier graduat en informatique',
        'premier graguat informatique',
        'premier graguat info',
        'première graguat info',
        'graduat 1',
        'première graduat en informatique',
        'première graguat informatique',

    ],
    "G2 informatique": [
        "g2 informatique",
        "g2 info",
        'g2 math info',
        'g2 math-info',
        'g2 mathematique informatique',
        'g2info',
        'g2informatique',
        'deuxieme graduat en informatique',
        'deuxieme graguat informatique',
        'graduat 2',
    ],
    "G3 informatique": [
        "g3 informatique",
        "g3 info",
        'g3 math info',
        'g3 math-info',
        'g3 mathematique informatique',
        'g3info',
        'g3informatique',
        'troisieme graduat en informatique',
        'troisieme graguat informatique',
        'troisieme graguat info',
        'graduat 3',
        'troisième graduat en informatique',
        'troisième graduat informatique',
        'troisième graduat info',
        'graduat 3',
    ],
    "L1 Génie informatique": [
        "l1 genie",
        "l1 geni",
        "l1 genie informatique",
        "l1 genie",
        "l1 geni info",
        "l1 info geni",
        "l1 geni informatique",
        "l1 génie",
        "l1 géni",
        "l1 génie informatique",
        "l1 génie",
        "l1 géni info",
        "l1 géni informatique",
        "premiere licence en génie informatique",
        "première licence en génie informatique",
        "premier licence en génie informatique",
        "première licence en géni informatique",
        "premiere licence génie informatique",
        "première licence génie informatique",
        "premier licence génie informatique",
        "première licence géni informatique",
        "l1 info geni",
        "l1 infomatique genie",
        "l1 infomatique geni",
    ],
    "L1 Gestion informatique": [
        "l1 gestion",
        "l1 gestion",
        "l1 gestion informatique",
        "l1 gestion info",
        "l1 info gestion",
        "l1 info gest",
        "l1 infomatique gestion",
        "l1 infomatique gestion",
        "premiere licence en gestion informatique",
        "première licence en gestion informatique",
        "premier licence en gestion informatique",
        "première licence en gestion informatique",
        "premiere licence gestion informatique",
        "première licence gestion informatique",
        "premier licence gestion informatique",
        "première licence gestion informatique",
    ],
    "L2 Génie informatique": [
        "l2 genie",
        "l2 geni",
        "l2 genie informatique",
        "l2 genie",
        "l2 geni info",
        "l2 génie",
        "l2 géni",
        "l2 génie informatique",
        "l2 génie",
        "l2 géni info",
        "l2 géni informatique",
        "deuxieme licence en génie informatique",
        "deuxieme licence en génie informatique",
        "deuxieme licence en génie informatique",
        "deuxieme licence en géni informatique",
        "deuxième licence génie informatique",
        "deuxième licence génie informatique",
        "deuxième licence génie informatique",
        "deuxième licence géni informatique",
        "l2 info geni",
        "l2 infomatique genie",
        "l2 infomatique geni",
    ],
    "L2 Gestion informatique": [
        "l2 gestion",
        "l2 gestion",
        "l2 gestion informatique",
        "l2 gestion info",
        "l2 info geni",
        "l2 infomatique gestion",
        "l2 infomatique gestion",
        "deuxieme licence en gestion informatique",
        "deuxieme licence en gestion informatique",
        "deuxieme licence en gestion informatique",
        "deuxieme licence en gestion informatique",
        "deuxième licence gestion informatique",
        "deuxième licence gestion informatique",
        "deuxième licence gestion informatique",
        "deuxième licence gestion informatique",
    ]
}