import * as R from 'ramda';

import { layouts as L } from 'snapdragon-config/screen-layouts';

const propertyTrait = (traitPropertyMatch, traits) => {
    const layout = R.clone(traitPropertyMatch);
    layout.screens[0].traits = traits;
    layout.screens[1].traits = traits;
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
            layouts: [ L.mixedSpecimenImages, L.familyMatch, L.familyStripsMatch ],
        },
        // {   id: 1,
        //     name:'Level 1',
        //     layouts: [ L.mixedSpecimenImages, L.commonToLatinMatch, L.textCompleteGenus
        //         , propertyTrait(L.mixedTraitImages, ['leafShape', 'leafDivision', 'inflorescence', 'leafMargin'])
        //         , L.textCompleteSpecies, L.latinToCommonMatch
        //     ],
        //     bonusLayouts: [ { ...L.traitPropertyMatch, types: [ 'traits', 'song', 'lookalikes', 'definition' ] } ]
        // },
        // {   id: 2,
        //     name:'Level 2',
        //     layouts: [ L.textCompleteGenus, L.textCompleteSpecies ],
        // },
        // {   id: 3,
        //     name:'Level 3',
        //     layouts: [ L.commonEntry, L.familyMatch, L.familyStripsMatch ],
        // },
        // {   id: 4,
        //     name:'Level 4',
        //     layouts: [ L.speciesEntry, L.genusEntry, L.speciesGenusEntry ],
        // }
    ]
};