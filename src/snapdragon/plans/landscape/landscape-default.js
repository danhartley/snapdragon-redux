import { layouts as L } from 'snapdragon/screen-layouts';

let landscapeLayouts = [
    L.mixedSpecimenImages,    
    L.traitPropertyMatch,
    L.textCompleteGenus,
    L.textCompleteSpecies,
    L.genusEntry,
    L.speciesEntry,
    L.speciesGenusEntry,
    L.commonEntry,
    L.latinToCommonMatch,
    L.familyMatch,
    L.familyStripsMatch,    
    L.symbioticPropertyMatch
];

landscapeLayouts = [ L.mediaMatch ];

export const landscapeDefault = {
    id: 1,
    name:'Lesson 1',
    portrait: false,
    default: true,
    levels: [
        {   id: 1,
            name:'Level 1',
            description: 'Species recognition',
            layouts: [ L.commonToLatinMatch ],
            // layouts: [ L.latinToCommonMatch ],
            // layouts: [ L.mixedSpecimenImages ],
            // wildcardLayouts : [ L.glossaryTerms ],
            // reviewLayouts: [ L.mixedSpecimenImages ]
        },
        {   id: 2,
            name:'Level 2',
            description: 'The common name of species',
            // layouts: landscapeLayouts
            layouts: [ 
                L.latinToCommonMatch,
                // commonEntry
            ],
            // wildcardLayouts : [ ],
            // reviewLayouts: [ 
            //     latinToCommonMatch,
            //     commonEntry,
            // ]
        },
        {   id: 3,
            name:'Level 3',
            description: 'Family traits',
            layouts: [ L.familyStripsMatch ],
            wildcardLayouts : [ ],
            reviewLayouts: [ ]
        },  
        {   id: 4,
            name:'Level 4',
            description: 'The genus name of species',
            layouts: [ 
                L.textCompleteGenus,
                L.genusEntry
            ],
            wildcardLayouts : [  ],
            reviewLayouts: [ ]
        },
        {   id: 5,
            name:'Level 5',
            description: 'The species name of species',
            layouts: [ 
                L.textCompleteSpecies,
                L.speciesEntry
             ],
            wildcardLayouts : [  ],
            reviewLayouts: [ L.textCompleteSpecies ]
        },
        {   id: 6,
            name:'Level 6',
            description: 'The full latin name of species',
            layouts: [          
                L.multiSpecimenLatinMatch,       
                L.commonToLatinMatch,
                L.speciesGenusEntry, 
            ],
            wildcardLayouts : [  ],
            reviewLayouts: [ L.speciesGenusEntry ]
        } 
    ]
};