import * as R from 'ramda';

import { layouts as L } from 'snapdragon-config/screen-layouts';

const propertyTrait = (traitPropertyMatch, trait) => {
    const layout = R.clone(traitPropertyMatch);
    layout.screens[1].trait = trait;
    return layout;
};

export const landscapeFungi = {
    id: 3,
    name:'Lesson 3',
    portrait: false,
    default: false,
    levels: [
        {   id: 1,
            name:'Level 1',
            description: 'Species recognition',
            layouts: [ 
                L.speciesRevision,                        
                L.multiSpecimenCommonMatch,
                L.mixedSpeciesMatch
            ],
            reviewLayouts: [ L.multiSpecimenCommonMatch, L.mixedSpeciesMatch ]
        },
        {   id: 2,
            name:'Level 2',
            description: 'The common name of species',
            layouts: [ 
                L.latinToCommonMatch,
                L.commonEntry
            ],
            reviewLayouts: [ 
                L.latinToCommonMatch,
                L.commonEntry,
            ]
        },
        {   id: 3,
            name:'Level 3',
            description: 'Species traits',
            layouts: [ 
                { ...L.traitPropertyMatch, ...propertyTrait(L.traitPropertyMatch, 'howEdible') },
                { ...L.traitPropertyMatch, ...propertyTrait(L.traitPropertyMatch, 'capShape') }                 
            ],
            reviewLayouts: [ 
                { ...L.traitPropertyMatch, ...propertyTrait(L.traitPropertyMatch, 'howEdible') },
                { ...L.traitPropertyMatch, ...propertyTrait(L.traitPropertyMatch, 'capShape') },
             ]
        },
        {   id: 4,
            name:'Level 4',
            description: 'The genus name of species',
            layouts: [ 
                L.textCompleteGenus,
                L.genusEntry
            ],
            reviewLayouts: [ L.textCompleteGenus, L.genusEntry ]
        },
        {   id: 5,
            name:'Level 5',
            description: 'The species name of species',
            layouts: [ 
                L.textCompleteSpecies,
                L.speciesEntry
             ],
            reviewLayouts: [ L.textCompleteSpecies, L.speciesEntry ]
        },
        {   id: 6,
            name:'Level 6',
            description: 'The full latin name of species',
            layouts: [          
                L.multiSpecimenLatinMatch,       
                L.commonToLatinMatch,
                L.speciesGenusEntry, 
            ],
            reviewLayouts: [ L.speciesGenusEntry ]
        } 
    ]
};

export const landscapeLichens = { ...R.clone(landscapeFungi), id: 4 };
landscapeLichens.levels[0] = { 
    id: 1,
    name:'Level 1',
    description: 'Species recognition',
    layouts: [ 
        L.speciesRevision,
        L.multiSpecimenCommonMatch,
        L.mixedSpeciesMatch
    ],
    reviewLayouts: [ L.multiSpecimenCommonMatch, L.mixedSpeciesMatch ]
};