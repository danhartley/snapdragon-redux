import * as R from 'ramda';

import { layouts } from 'snapdragon/screen-layouts';

const {
    mixedSpeciesMatch,
    speciesRevision,
    taxonRevision,
    nonTaxonRevision,
    definitionRevision,
    latinToCommonMatch,
    commonToLatinMatch,
    textCompleteGenus,
    multiSpecimenCommonMatch,
    multiSpecimenLatinMatch,
    traitPropertyMatch,
    familyMatch,
    cultivarMatch,
    familyStripsMatch,
    genusEntry,
    speciesEntry,
    speciesGenusEntry,
    textCompleteSpecies,
    commonEntry,
    connections,
    leafEntry,
    glossaryTerms,
    latinEpithets,
    cultivars,
    mixedSpecimenImages
  } = layouts;

const propertyTrait = (traitPropertyMatch, trait) => {
    const layout = R.clone(traitPropertyMatch);
    layout.screens[1].trait = trait;
    return layout;
};

const landscapeLesson1 = {
    id: 1,
    name:'Lesson 1',
    portrait: false,
    default: true,
    levels: [
        {   id: 1,
            name:'Level 1',
            description: 'Species recognition',
            layouts: [ 

                // mixedSpecimenImages, GOOD

                

                // textCompleteGenus, GOOD
                // textCompleteSpecies, GOOD
                // genusEntry, GOOD
                // speciesEntry, GOOD
                // speciesGenusEntry, GOOD
                // commonEntry, GOOD

                speciesRevision, // excluded in lesson-builder                  
                // multiSpecimenCommonMatch, // only works portrait as in landscape the photo is the same
                // mixedSpeciesMatch, // replace with clickable rhs images
                latinToCommonMatch,  // works fine
                
                taxonRevision, // excluded in lesson-builder                  
                familyMatch, // missing family data an issue
                familyStripsMatch,// missing family data an issue
                
            ],
            wildcardLayouts : [],
            reviewLayouts: [ multiSpecimenCommonMatch, mixedSpeciesMatch ]
        },
        {   id: 2,
            name:'Level 2',
            description: 'The common name of species',
            layouts: [ 
                latinToCommonMatch,
                commonEntry
            ],
            wildcardLayouts : [ ],
            reviewLayouts: [ 
                latinToCommonMatch,
                commonEntry,
            ]
        },
        {   id: 3,
            name:'Level 3',
            description: 'Family traits',
            layouts: [ taxonRevision, familyMatch, familyStripsMatch ],
            wildcardLayouts : [ connections ],
            reviewLayouts: [ familyStripsMatch ]
        },  
        {   id: 4,
            name:'Level 4',
            description: 'The genus name of species',
            layouts: [ 
                textCompleteGenus,
                genusEntry
            ],
            wildcardLayouts : [  ],
            reviewLayouts: [ textCompleteGenus, genusEntry ]
        },
        {   id: 5,
            name:'Level 5',
            description: 'The species name of species',
            layouts: [ 
                textCompleteSpecies,
                speciesEntry
             ],
            wildcardLayouts : [  ],
            reviewLayouts: [ textCompleteSpecies, speciesEntry ]
        },
        {   id: 6,
            name:'Level 6',
            description: 'The full latin name of species',
            layouts: [          
                multiSpecimenLatinMatch,       
                commonToLatinMatch,
                speciesGenusEntry, 
            ],
            wildcardLayouts : [  ],
            reviewLayouts: [ speciesGenusEntry ]
        } 
    ]
};

const landscapeLesson2 = {
    id: 2,
    name:'Lesson 2',
    portrait: false,
    levels: [
        {   id: 1,
            name:'Level 1',
            description: 'Name the leaf structure',
            layouts: [ leafEntry ]
        }
    ]
};

const landscapeLesson3 = {
    id: 3,
    name:'Lesson 3',
    portrait: false,
    default: false,
    levels: [
        {   id: 1,
            name:'Level 1',
            description: 'Species recognition',
            layouts: [ 
                speciesRevision,                        
                multiSpecimenCommonMatch,
                mixedSpeciesMatch
            ],
            wildcardLayouts : [],
            reviewLayouts: [ multiSpecimenCommonMatch, mixedSpeciesMatch ]
        },
        {   id: 2,
            name:'Level 2',
            description: 'The common name of species',
            layouts: [ 
                latinToCommonMatch,
                commonEntry
            ],
            wildcardLayouts : [ ],
            reviewLayouts: [ 
                latinToCommonMatch,
                commonEntry,
            ]
        },
        {   id: 3,
            name:'Level 3',
            description: 'Species traits',
            layouts: [ 
                definitionRevision,
                { ...traitPropertyMatch, ...propertyTrait(traitPropertyMatch, 'howEdible') },
                { ...traitPropertyMatch, ...propertyTrait(traitPropertyMatch, 'capShape') }                 
            ],
            wildcardLayouts : [ glossaryTerms ],
            reviewLayouts: [ 
                { ...traitPropertyMatch, ...propertyTrait(traitPropertyMatch, 'howEdible') },
                { ...traitPropertyMatch, ...propertyTrait(traitPropertyMatch, 'capShape') },
             ]
        },
        {   id: 4,
            name:'Level 4',
            description: 'The genus name of species',
            layouts: [ 
                textCompleteGenus,
                genusEntry
            ],
            wildcardLayouts : [  ],
            reviewLayouts: [ textCompleteGenus, genusEntry ]
        },
        {   id: 5,
            name:'Level 5',
            description: 'The species name of species',
            layouts: [ 
                textCompleteSpecies,
                speciesEntry
             ],
            wildcardLayouts : [  ],
            reviewLayouts: [ textCompleteSpecies, speciesEntry ]
        },
        {   id: 6,
            name:'Level 6',
            description: 'The full latin name of species',
            layouts: [          
                multiSpecimenLatinMatch,       
                commonToLatinMatch,
                speciesGenusEntry, 
            ],
            wildcardLayouts : [  ],
            reviewLayouts: [ speciesGenusEntry ]
        } 
    ]
};

const portraitLesson1 = {
    id: 101,
    name:'Lesson 101',
    portrait: true,
    default: true,
    levels: [
        {   id: 1,
            name:'Level 1',
            layouts: [ 
                speciesRevision, 
                latinToCommonMatch, 
                mixedSpeciesMatch,
                commonToLatinMatch 
            ],
            wildcardLayouts : [],
            reviewLayouts: [ latinToCommonMatch ]
        },
        {   id: 2,
            name:'Level 2',
            layouts: [ textCompleteGenus, commonEntry, textCompleteSpecies, genusEntry ],
            wildcardLayouts : [ latinEpithets ],
            reviewLayouts: [ commonEntry, textCompleteSpecies, genusEntry ]
        },
        {   id: 3,
            name:'Level 3',
            layouts: [ speciesEntry ],
            wildcardLayouts : [glossaryTerms],
            reviewLayouts: [ speciesEntry ]
        },
        {   id: 4,
            name:'Level 4',
            layouts: [ speciesGenusEntry ],
            wildcardLayouts : [ cultivars ],
            reviewLayouts: [ speciesGenusEntry ]
        },
        {   id: 5,
            name:'Level 5',
            layouts: [ taxonRevision, familyMatch, familyStripsMatch ],
            wildcardLayouts : [ connections ],
            reviewLayouts: [ familyStripsMatch ]
        }   
    ]
};

const portraitLesson2 = {
    id: 102,
    name:'Lesson 102',
    portrait: true,
    levels: [
        {   id: 1,
            name:'Level 1',
            description: 'Name the leaf structure',
            layouts: [ leafEntry ]
        }
    ]
};

const portraitLesson3 = {
    id: 103,
    name:'Lesson 103',
    portrait: true,
    default: false,
    levels: [
        {   id: 1,
            name:'Level 1',
            description: 'Species recognition',
            layouts: [ 
                speciesRevision,   
                // nonTaxonRevision,                              
                multiSpecimenCommonMatch,
                mixedSpeciesMatch
            ],
            wildcardLayouts : [],
            reviewLayouts: [ multiSpecimenCommonMatch, mixedSpeciesMatch ]
        },
        {   id: 2,
            name:'Level 2',
            description: 'The common name of species',
            layouts: [ 
                latinToCommonMatch,
                commonEntry
            ],
            wildcardLayouts : [ ],
            reviewLayouts: [ 
                latinToCommonMatch,
                commonEntry,
            ]
        },
        {   id: 3,
            name:'Level 3',
            description: 'Species traits',
            layouts: [ 
                definitionRevision,
                { ...traitPropertyMatch, ...propertyTrait(traitPropertyMatch, 'howEdible') },
                { ...traitPropertyMatch, ...propertyTrait(traitPropertyMatch, 'capShape') }         
            ],
            wildcardLayouts : [ glossaryTerms ],
            reviewLayouts: [ 
                { ...traitPropertyMatch, ...propertyTrait(traitPropertyMatch, 'howEdible') },
                { ...traitPropertyMatch, ...propertyTrait(traitPropertyMatch, 'capShape') },
             ]
        },
        {   id: 4,
            name:'Level 4',
            description: 'The genus name of species',
            layouts: [ 
                textCompleteGenus,
                genusEntry
            ],
            wildcardLayouts : [  ],
            reviewLayouts: [ textCompleteGenus, genusEntry ]
        },
        {   id: 5,
            name:'Level 5',
            description: 'The species name of species',
            layouts: [ 
                textCompleteSpecies,
                speciesEntry
             ],
            wildcardLayouts : [  ],
            reviewLayouts: [ textCompleteSpecies, speciesEntry ]
        },
        {   id: 6,
            name:'Level 6',
            description: 'The full latin name of species',
            layouts: [          
                multiSpecimenLatinMatch,       
                commonToLatinMatch,
                speciesGenusEntry, 
            ],
            wildcardLayouts : [  ],
            reviewLayouts: [ speciesGenusEntry ]
        } 
    ]
};

const lichenLessonLandscape = { ...R.clone(landscapeLesson3), id: 4 };
lichenLessonLandscape.levels[0] = { 
    id: 1,
    name:'Level 1',
    description: 'Species recognition',
    layouts: [ 
        // nonTaxonRevision,                              
        speciesRevision,
        multiSpecimenCommonMatch,
        mixedSpeciesMatch
    ],
    wildcardLayouts : [],
    reviewLayouts: [ multiSpecimenCommonMatch, mixedSpeciesMatch ]
};

const lichenLessonPortrait = { ...R.clone(landscapeLesson3), id: 5, portrait: true };
lichenLessonPortrait.levels[0] = { 
    id: 1,
    name:'Level 1',
    description: 'Species recognition',
    layouts: [ 
        // nonTaxonRevision,                              
        speciesRevision,
        multiSpecimenCommonMatch,
        mixedSpeciesMatch
    ],
    wildcardLayouts : [],
    reviewLayouts: [ multiSpecimenCommonMatch, mixedSpeciesMatch ]
};

export const lessonPlans = [
    landscapeLesson1,
    landscapeLesson2, 
    landscapeLesson3,
    portraitLesson1,
    portraitLesson2,
    portraitLesson3,
    lichenLessonLandscape,
    lichenLessonPortrait
]