import * as R from 'ramda';

import { layouts as L } from 'snapdragon-config/screen-layouts';

const propertyTrait = (traitPropertyMatch, trait) => {
    const layout = R.clone(traitPropertyMatch);
    layout.screens[0].trait = trait;
    layout.screens[1].trait = trait;
    return layout;
};

export const portraitStatic = {
    id: 110,
    name:'Lesson 110',
    portrait: true,
    default: true,
    levels: [
        {   id: 1,
            name:'Level 1',
            layouts: [                          
                        L.mixedSpecimenImages, L.latinToCommonMatch, L.commonEntry,
                        L.commonToLatinMatch,
                        L.textCompleteGenus, L.genusEntry,                        
                        L.textCompleteSpecies, L.speciesEntry,
                        propertyTrait(L.mixedTraitImages, ['capShape', 'gillAttachment', 'leafShape', 'leafDivision', 'inflorescence', 'leafMargin']),
                        L.speciesGenusEntry,
                        L.familyMatch , L.familyStripsMatch
                    ],
            bonusLayouts: [ { ...L.traitPropertyMatch, types: [ 'lookalikes', 'definition' ] } ]
        }
    ]
};

// export const portraitStatic = {
//     id: 110,
//     name:'Lesson 101',
//     portrait: true,
//     default: true,
    // levels: [
        // {   id: 1,
            // name:'Level 1',     
            // layouts: [ L.familyMatch ],       
            // layouts: [ L.mixedSpecimenImages, L.commonToLatinMatch, L.familyMatch , L.familyStripsMatch, L.textCompleteGenus, L.textCompleteSpecies ],
            // layouts: [ L.mixedSpecimenImages, L.latinToCommonMatch ],
            // reviewLayouts: [ L.mixedSpecimenImages, L.latinToCommonMatch ],
            // bonusLayouts: [ { ...L.traitPropertyMatch, types: [ 'traits', 'song', 'definition' ] } ]
        // },
        // {   id: 2,
        //     name:'Level 2',
        //     layouts: [ L.commonToLatinMatch, L.textCompleteGenus, L.textCompleteSpecies ],
        //     reviewLayouts: [ L.commonToLatinMatch, L.textCompleteGenus, L.textCompleteSpecies ]
        // },
        // {   id: 3,
        //     name:'Level 3',
        //     layouts: [ L.commonEntry, L.familyMatch, L.familyStripsMatch ],
        //     reviewLayouts: [ L.commonEntry, L.familyStripsMatch ]
        // },
        // {   id: 4,
        //     name:'Level 4',
        //     layouts: [ L.speciesEntry, L.genusEntry ],
        //     reviewLayouts: [ L.speciesEntry, L.genusEntry ]
        // },
        // {   id: 5,
        //     name:'Level 5',
        //     layouts: [ L.speciesGenusEntry ],
        //     reviewLayouts: [ L.speciesGenusEntry ]
        // }
//     ]
// };