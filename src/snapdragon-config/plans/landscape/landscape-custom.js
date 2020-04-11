import * as R from 'ramda';

import { layouts as L } from 'snapdragon-config/screen-layouts';

export const landscapeCustom = {
    id: 1,
    name:'Lesson 1',
    portrait: false,
    default: true,
    levels: [
        {   id: 1,
            name:'Level 1',
            layouts: [                          
                        L.mixedSpecimenImages, 
                        L.latinToCommonMatch, L.commonEntry,
                        L.commonToLatinMatch,
                        L.textCompleteGenus, L.genusEntry,                        
                        L.textCompleteSpecies, L.speciesEntry,
                        L.speciesGenusEntry,
                        L.familyMatch , L.familyStripsMatch
                    ],
            bonusLayouts: [ { ...L.traitPropertyMatch, types: [ 'definition' ] } ]
        }
    ]
};

export const landscapeCustom2 = {
    id: 2,
    name:'Lesson 2',
    portrait: false,
    default: true,
    levels: [
        {   id: 1,
            name:'Level 1',
            layouts: [                          
                        L.mixedSpecimenImages, 
                        L.familyMatch , L.familyStripsMatch
                    ],
            bonusLayouts: [ { ...L.traitPropertyMatch, types: [ 'definition' ] } ]
        }
    ]
};