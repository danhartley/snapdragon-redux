import { layouts as L } from 'snapdragon/screen-layouts';

let portraitLayouts = [ 
                
    L.genusEntry,
    L.textCompleteGenus,                
    L.latinToCommonMatch,
    L.mixedSpeciesMatch,    
    L.speciesEntry,
    L.speciesGenusEntry,    
    L.commonToLatinMatch,
    L.textCompleteSpecies,    
    L.commonEntry,
];

// portraitLayouts = [ textCompleteSpecies ];
// portraitLayouts = [ mediaMatch ];

export const portraitDefault = {
    id: 101,
    name:'Lesson 101',
    portrait: true,
    default: true,
    levels: [
        {   id: 1,
            name:'Level 1',
            // layouts: [ mediaMatch ],
            layouts: [ L.mixedSpeciesMatch ],
            // wildcardLayouts : [ L.latinEpithets ],
            // wildcardLayouts : [],
            reviewLayouts: [ L.mixedSpeciesMatch ]
        },
        {   id: 2,
            name:'Level 2',
            layouts: portraitLayouts
            // layouts: [ textCompleteGenus, commonEntry, textCompleteSpecies, genusEntry ],
            // wildcardLayouts : [ latinEpithets ],
            // reviewLayouts: [ commonEntry, textCompleteSpecies, genusEntry ]
        },
        {   id: 3,
            name:'Level 3',
            layouts: [ L.speciesEntry ],
            wildcardLayouts : [ L.glossaryTerms ],
            reviewLayouts: [ L.speciesEntry ]
        },
        {   id: 4,
            name:'Level 4',
            layouts: [ L.speciesGenusEntry ],
            wildcardLayouts : [ L.cultivars ],
            reviewLayouts: [ L.speciesGenusEntry ]
        },
        {   id: 5,
            name:'Level 5',
            layouts: [ L.familyMatch, L.familyStripsMatch ],
            wildcardLayouts : [ L.connections ],
            reviewLayouts: [ L.familyStripsMatch ]
        }   
    ]
};