import * as R from 'ramda';

import { layouts as L } from 'snapdragon-config/screen-layouts';

const propertyTrait = (traitPropertyMatch, trait) => {
    const layout = R.clone(traitPropertyMatch);
    layout.screens[0].trait = trait;
    layout.screens[1].trait = trait;
    return layout;
};

export const landscapeDefault = {
    id: 1,
    moduleSize: 1,
    name:'Lesson 1',
    portrait: false,
    default: true,
    levels: [
        {   id: 1,
            name:'Level 1',
            layouts: [ L.mixedSpecimenImages, L.commonToLatinMatch, L.textCompleteSpecies ],
            // layouts: [ L.mixedSpecimenImages, L.commonToLatinMatch, propertyTrait(L.mixedTraitImages, 'leafShape'), L.textCompleteSpecies ],
            bonusLayouts: [ { ...L.traitPropertyMatch, types: [ 'traits', 'song', 'lookalikes', 'definition' ] } ]
        },
        {   id: 2,
            name:'Level 2',
            layouts: [ L.commonToLatinMatch, L.textCompleteGenus, L.textCompleteSpecies ],
            reviewLayouts: [ L.commonToLatinMatch, L.textCompleteGenus, L.textCompleteSpecies ],
            bonusLayouts: [ L.traitPropertyMatch ]
        },
        {   id: 3,
            name:'Level 3',
            layouts: [ L.commonEntry, L.familyMatch, L.familyStripsMatch ],
            reviewLayouts: [ L.commonEntry, L.familyStripsMatch ]
        },
        {   id: 4,
            name:'Level 4',
            layouts: [ L.speciesEntry, L.genusEntry ],
            reviewLayouts: [ L.speciesEntry, L.genusEntry ]
        },
        {   id: 5,
            name:'Level 5',
            layouts: [ L.speciesGenusEntry ],
            reviewLayouts: [ L.speciesGenusEntry ]
        }
    ]
};