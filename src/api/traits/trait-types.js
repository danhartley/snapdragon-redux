import { actions } from 'redux/actions/action-creators';

import { english } from 'api/traits/language/en-trait-types';
import { portuguese } from 'api/traits/language/pt-trait-types';

export const enums = {
    name: english.name,
    howEdible: english.howEdible,
    habitat: english.habitat,
    ecoType: english.ecoType, 
    capShape: english.capShape,
    treeType: english.treeType,
    hymeniumType: english.hymeniumType,
    associate: english.associate,
    thallusType: english.thallusType,
    rhizineType: english.rhizineType,
    substrate: english.substrate,
    level: english.level,
    medicinalProperties: english.medicinalProperties,
    pHLevel: english.pHLevel,
    colour: english.colour,
    usage: english.usage,
    nonTaxaType: english.nonTaxaType,
    boolean: english.boolean,
    whether: english.whether,
    element: english.element,
    blade: english.blade,
    leafType: english.leafType,
    leafVariation: english.leafVariation,
    leafShape: english.leafShape,
    sex: english.sex,
    stemArrangement: english.stemArrangement,
    leafEdge: english.leafEdge,
    foodType: english.foodType,
    developmentStage: english.developmentStage,
    symbiosis: english.symbiosis,
    trophicLevel: english.trophicLevel,
    shelter: english.shelter,
    active: english.active,
    young: english.young,
    month: english.month,
    female: english.female,
    male: english.male,
    diet: english.diet,
    marginType: english.marginType,
    soilType: english.soilType,
    organisation: english.organisation,
    role: english.role,
    fruitType: english.fruitType,
    inflorescence: english.inflorescence,
    // seasonal: english.seasonal,
    display: english.display,
    behaviour: english.behaviour,
    sense: english.sense,
    crypsis: english.crypsis,
    allochory: english.allochory,
    reproductiveContainer: english.reproductiveContainer,
    communication: english.communication,
    mating: english.mating,
    physiology: english.physiology,
    collective: english.collective,
    ecology: english.ecology,
    characteristic: english.characteristic,
    climate: english.climate,
    pollination: english.pollination,
}

let language;

export const updateLanguage = (config) => {
    
    if(language === config.language) return;

    language = config.language;

    for(let prop in enums) {
        enums[prop].type = prop;
        enums[prop].name = prop.split(/(?=[A-Z])/).join(' ').toLowerCase();
    }

    actions.boundUpdateEnums(enums);
};

export const typedEnums = enums => {
    const typedEnums = [];
    for (var key in enums) {
        if(enums[key] && enums[key].name) {
            typedEnums.push({[key]: enums[key]});
        }        
    }
    return typedEnums.map(typedEnum => {
        for (var key in typedEnum) {
            const help = typedEnum[key].help || '';
            const obj = { name: typedEnum[key].name, type: typedEnum[key].type, help };
            return obj;
        }
    });
};

// To check: I think all species are now typed automatically… no! yes, no, etc.

export const typedSpecies = (enums, speciesTraits)=> {
    const typed = typedEnums(enums);
    const species = [];
    if(!speciesTraits.traits) return [];
    speciesTraits.traits.map(trait => {
        typed.forEach(t => {
            if(trait.name && trait.name.toLowerCase() === t.name.toLowerCase())
            species.push({ ...trait, ...t });
        });
    });
    return species;
}
