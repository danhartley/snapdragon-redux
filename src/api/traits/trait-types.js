import { actions } from 'redux/actions/action-creators';
import { firestore } from 'api/firebase/firestore';

import { english } from 'api/traits/language/en-trait-types';
import { portuguese } from 'api/traits/language/pt-trait-types';

// export const enums = {
//     name: english.name,
//     howEdible: english.howEdible,
//     habitat: english.habitat,
//     ecoType: english.ecoType, 
//     capShape: english.capShape,
//     treeType: english.treeType,
//     hymeniumType: english.hymeniumType,
//     associate: english.associate,
//     thallusType: english.thallusType,
//     rhizineType: english.rhizineType,
//     substrate: english.substrate,
//     level: english.level,
//     medicinalProperties: english.medicinalProperties,
//     pHLevel: english.pHLevel,
//     colour: english.colour,
//     usage: english.usage,
//     nonTaxaType: english.nonTaxaType,
//     element: english.element,
//     blade: english.blade,
//     leafType: english.leafType,
//     leafVariation: english.leafVariation,
//     leafShape: english.leafShape,
//     reproduction: english.reproduction,
//     asexualReproduction: english.asexualReproduction,
//     stemArrangement: english.stemArrangement,
//     leafEdge: english.leafEdge,
//     food: english.food,
//     hibernatingStage: english.hibernatingStage,
//     symbiosis: english.symbiosis,
//     trophicLevel: english.trophicLevel,
//     shelter: english.shelter,
//     active: english.active,
//     young: english.young,
//     month: english.month,
//     female: english.female,
//     male: english.male,
//     diet: english.diet,
//     marginType: english.marginType,
//     soilType: english.soilType,
//     organisation: english.organisation,
//     role: english.role,
//     fruitType: english.fruitType,
//     inflorescence: english.inflorescence,
//     // seasonal: english.seasonal,
//     display: english.display,
//     behaviour: english.behaviour,
//     sense: english.sense,
//     crypsis: english.crypsis,
//     allochory: english.allochory,
//     reproductiveContainer: english.reproductiveContainer,
//     communication: english.communication,
//     matingSystem: english.matingSystem,
//     physiology: english.physiology,
//     collective: english.collective,
//     ecology: english.ecology,
//     characteristic: english.characteristic,
//     climate: english.climate,
//     pollination: english.pollination,
//     stipeCharacter: english.stipeCharacter,
//     gillAttachment: english.gillAttachment,
//     grouping: english.grouping,
//     propagation: english.propagation,
// }

let language;

export const updateLanguage = async config => {
    
    if(language === config.language) return;

    language = config.language;

    for(let prop in enums) {
        enums[prop].type = prop;
        enums[prop].name = prop.split(/(?=[A-Z])/).join(' ').toLowerCase();
    }

    const enums = await firestore.getTraitValues();

    actions.boundUpdateEnums(enums);
};
