import * as R from 'ramda';

import { layouts as L } from 'snapdragon-config/screen-layouts';

export const landscapeFungi = {
    id: 3,
    name:'Lesson 3',
    portrait: false,
    default: false,
    levels: [
        {   id: 1,
            name:'Level 1',
            layouts: [                          
                        L.mixedSpecimenImages, 
                        L.latinToCommonMatch, L.commonEntry,
                        // L.commonToLatinMatch,
                        // L.textCompleteGenus, L.genusEntry,                        
                        // L.textCompleteSpecies, L.speciesEntry,
                        // L.propertyTrait(L.mixedTraitImages, ['capShape']),
                        // L.propertyTrait(L.mixedTraitImages, ['gillAttachment']),
                        // L.speciesGenusEntry
                    ],
            bonusLayouts: [ { ...L.traitPropertyMatch, types: [ 'lookalikes', 'definition' ] } ]
        },
    ]
};

export const landscapeLichens = { ...R.clone(landscapeFungi), id: 4 };
landscapeLichens.levels[0] = { 
    id: 1,
    name:'Level 1',
    description: 'Species recognition',
    layouts: [                          
        L.mixedSpecimenImages
    ],
    // bonusLayouts: [ { ...L.traitPropertyMatch, types: [ 'definition' ] } ]
    // reviewLayouts: [ L.multiSpecimenCommonMatch, L.mixedSpecimensRight ]
};