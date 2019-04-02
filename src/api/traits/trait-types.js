import { actions } from 'redux/actions/action-creators';

import { english } from 'api/traits/language/en-trait-types';
import { portuguese } from 'api/traits/language/pt-trait-types';

export let name = english.name;
export let howEdible = english.howEdible;
export let habitat = english.habitat;
export let ecoType = english.ecoType; 
export let capShape = english.capShape;
export let treeType = english.treeType;
export let hymeniumType = english.hymeniumType;
export let associate = english.associate;
export let thallusType = english.thallusType;
export let rhizineType = english.rhizineType;
export let substrate = english.substrate;
export let level = english.level;
export let medicinalProperties = english.medicinalProperties;
export let pHLevel = english.pHLevel;
export let colour = english.colour;
export let usage = english.usage;
export let nonTaxaType = english.nonTaxaType;
export let boolean = english.boolean;
export let whether = english.whether;
export let element = english.element;
export let rank = english.rank;
export let blade = english.blade;
export let leafType = english.leafType;
export let leafVariation = english.leafVariation;
export let leafShape = english.leafShape;
export let sex = english.sex;
export let longevity = english.longevity;
export let stemArrangement = english.stemArrangement;
export let leafEdge = english.leafEdge;
export let foodType = english.foodType;
export let developmentStage = english.developmentStage;
export let symbiosis = english.symbiosis;
export let trophicLevel = english.trophicLevel;
export let shelter = english.shelter;
export let active = english.active;
export let young = english.young;
export let month = english.month;
export let female = english.female;
export let male = english.male;
export let diet = english.diet;
export let marginType = english.marginType;
export let soilType = english.soilType;
export let organisation = english.organisation;
export let role = english.role;
export let migratory = english.migratory;
export let fruitType = english.fruitType;
export let inflorescence = english.inflorescence;
export let seasonal = english.seasonal;
export let display = english.display;
export let behaviour = english.behaviour;
export let sense = english.sense;

let language;

export const updateLanguage = (config) => {
    
    if(language === config.language) return;

    language = config.language;

    switch(language) {
        case 'en':
            name = english.name;
            howEdible = { ...english.howEdible, ...{ type: 'howEdible' }, ...{ name: english.name.HOW_EDIBLE } };
            habitat = { ...english.habitat, ...{ type: 'habitat' }, ...{ name: english.name.HABITAT } };
            ecoType = { ...english.ecoType, ...{ type: 'ecoType' }, ...{ name: english.name.ECO_TYPE } };
            capShape = { ...english.capShape, ...{ type: 'capShape' }, ...{ name: english.name.CAP_SHAPE } };
            hymeniumType = { ...english.hymeniumType, ... { type: 'hymeniumType' }, ...{ name: english.name.HYMENIUM_TYPE } };
            thallusType = { ...english.thallusType, ... { type: 'thallusType' }, ...{ name: english.name.THALLUS_TYPE } };
            trophicLevel = { ...english.trophicLevel, ... { type: 'trophicLevel' }, ...{ name: english.name.TROPHIC_LEVEL } };
            role = { ...english.role, ... { type: 'role' }, ...{ name: english.name.ROLE } };
            migratory = { ...english.whether, ... { type: 'migratory' }, ...{ name: english.name.MIGRATORY } };
            fruitType = { ...english.fruitType, ... { type: 'fruitType' }, ...{ name: english.name.FRUIT_TYPE } };
            usage = { ...english.usage, ... { type: 'usage' }, ...{ name: english.name.USAGE } };
        break;
        case 'pt':
            name = portuguese.name;
            howEdible = { ...portuguese.howEdible, ...{ type: 'howEdible' }, ...{ name: portuguese.name.HOW_EDIBLE } };
            ecoType = { ...portuguese.ecoType, ...{ type: 'ecoType' }, ...{ name: portuguese.name.ECO_TYPE } };
            capShape = { ...portuguese.capShape, ...{ type: 'capShape' }, ...{ name: portuguese.name.CAP_SHAPE } };
        break;
    }

    const enums = {
        name,
        habitat,
        treeType,
        howEdible,
        ecoType,
        capShape,
        hymeniumType,
        associate,
        thallusType,
        rhizineType,
        substrate,
        level,
        medicinalProperties,
        pHLevel,
        colour,
        usage,
        nonTaxaType,
        boolean,
        whether,
        element,
        rank,
        leafType,
        leafVariation,
        leafShape,
        sex,
        blade,
        longevity,
        stemArrangement,
        leafEdge, 
        foodType,
        developmentStage,
        symbiosis,
        trophicLevel,
        shelter,
        active,
        month,
        young,
        female,
        male,
        diet,
        marginType,
        soilType,
        organisation,
        role,
        migratory,
        fruitType,
        inflorescence,
        seasonal,
        display,
        behaviour,
        sense
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
            const obj = { name: typedEnum[key].name, type: typedEnum[key].type };
            return obj;
        }
    });
};

export const typedSpecies = (enums, speciesTraits)=> {
    const typed = typedEnums(enums);
    const species = [];
    speciesTraits.traits.map(trait => {
        typed.forEach(t => {
            if(trait.name === t.name)
            species.push({ ...trait, ...t });
        });
    });
    return species;
}
