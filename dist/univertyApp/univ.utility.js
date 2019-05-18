"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPromotionFromTag = (val) => {
    for (const key in promotionTag) {
        const tag = promotionTag[key];
        for (let index = 0; index < tag.length; index++) {
            console.log(tag[index] + '===' + val, tag[index].toLowerCase() === val.toLowerCase());
            if (tag[index].toLowerCase() === val.toLowerCase()) {
                return key;
            }
        }
    }
    return undefined;
};
exports.getCoursFromTag = (val, promotion) => {
    const coursT = coursTag[promotion];
    for (const key in coursT) {
        const tag = coursT[key];
        for (let index = 0; index < tag.length; index++) {
            console.log(tag[index] + '===' + val, tag[index].toLowerCase() === val.toLowerCase());
            if (tag[index].toLowerCase() === val.toLowerCase()) {
                return key;
            }
        }
    }
    return undefined;
};
exports.getRandomPhrases = (list) => {
    const seed = Math.floor(list.length * Math.random());
    return list[seed];
};
/**
 * promption tag value
 * style : {
 *  'name': ['tags']
 * }
 */
var coursTag = {
    "HGQqallpvFZ5rGqjW8NH": {
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
};
/**
 * cours contrainte
 */
var promotionTag = {
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
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5pdi51dGlsaXR5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3VuaXZlcnR5QXBwL3VuaXYudXRpbGl0eS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVXLFFBQUEsbUJBQW1CLEdBQUcsQ0FBQyxHQUFXLEVBQXFCLEVBQUU7SUFDaEUsS0FBSyxNQUFNLEdBQUcsSUFBSSxZQUFZLEVBQUU7UUFDNUIsTUFBTSxHQUFHLEdBQUcsWUFBWSxDQUFDLEdBQUcsQ0FBYSxDQUFDO1FBQzFDLEtBQUssSUFBSSxLQUFLLEdBQUcsQ0FBQyxFQUFFLEtBQUssR0FBRyxHQUFHLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxFQUFFO1lBQzdDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLEtBQUssR0FBRyxHQUFHLEVBQUUsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLFdBQVcsRUFBRSxLQUFLLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO1lBRXRGLElBQUksR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLFdBQVcsRUFBRSxLQUFLLEdBQUcsQ0FBQyxXQUFXLEVBQUUsRUFBRTtnQkFDaEQsT0FBTyxHQUFHLENBQUM7YUFDZDtTQUVKO0tBQ0o7SUFDRCxPQUFPLFNBQVMsQ0FBQztBQUNyQixDQUFDLENBQUE7QUFDVSxRQUFBLGVBQWUsR0FBRyxDQUFDLEdBQVcsRUFBRSxTQUFpQixFQUFxQixFQUFFO0lBQy9FLE1BQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNuQyxLQUFLLE1BQU0sR0FBRyxJQUFJLE1BQU0sRUFBRTtRQUN0QixNQUFNLEdBQUcsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFhLENBQUM7UUFDcEMsS0FBSyxJQUFJLEtBQUssR0FBRyxDQUFDLEVBQUUsS0FBSyxHQUFHLEdBQUcsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLEVBQUU7WUFDN0MsT0FBTyxD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