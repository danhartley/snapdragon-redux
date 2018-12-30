import * as R from 'ramda';

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
export let element = english.element;
export let rank = english.rank;

export const updateLanguage = (config) => {
    
    switch(config.language) {
        case 'en':
            name = english.name;
            howEdible = { ...english.howEdible, ...{ type: 'howEdible' }, ...{ name: english.name.HOW_EDIBLE } };
            habitat = { ...english.habitat, ...{ type: 'habitat' }, ...{ name: english.name.HABITAT } };
            ecoType = { ...english.ecoType, ...{ type: 'ecoType' }, ...{ name: english.name.ECO_TYPE } };
            capShape = { ...english.capShape, ...{ type: 'capShape' }, ...{ name: english.name.CAP_SHAPE } };
            hymeniumType = { ...english.hymeniumType, ... { type: 'hymeniumType' }, ...{ name: english.name.HYMENIUM_TYPE } };
            thallusType = { ...english.thallusType, ... { type: 'thallusType' }, ...{ name: english.name.THALLUS_TYPE } };
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
        element
    }

    actions.boundUpdateEnums(enums);   
};

export const typedEnums = enums => {
    const typedEnums = [];
    for (var key in enums) {
        if(enums[key].name) {
            typedEnums.push({[key]: enums[key]});
        }        
    }
    return typedEnums.map(typedEnum => {
        for (var key in typedEnum) {
            return { name: typedEnum[key].name, type: typedEnum[key].type };
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
