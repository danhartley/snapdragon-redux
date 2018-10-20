import { actions } from 'redux/actions/action-creators';

import { english } from 'api/traits/language/en-trait-types';
import { portuguese } from 'api/traits/language/pt-trait-types';

export let howEdible = english.howEdible;
export let habitats = english.habitats;
export let ecoType = english.ecoType; 
export let capShape = english.capShape;
export let treeTypes = english.treeTypes;
export let hymeniumType = english.hymeniumType;

export const updateLanguage = (config) => {
    
    switch(config.language) {
        case 'en':
            howEdible = english.howEdible;
            habitats = english.habitats;
            ecoType = english.ecoType;
            capShape = english.capShape;
            treeTypes = english.treeTypes;
            hymeniumType = english.hymeniumType;
        break;
        case 'pt':
            howEdible = portuguese.howEdible;
            ecoType = portuguese.ecoType;
            capShape = portuguese.capShape;
        break;
    }

    const enums = {
        habitats,
        treeTypes,
        howEdible,
        ecoType,
        capShape,
        hymeniumType
    }

    actions.boundUpdateEnums(enums);   
}
