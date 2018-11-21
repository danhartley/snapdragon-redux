import * as R from 'ramda';

import { screens } from 'snapdragon/screen-layouts';

const { 
    specimen, speciesCard, species, vernaculars, scientifics, text, 
    command, leaf, leafName, 
    family, familyStrips, taxon, nonTaxon, textComplete, cultivar, cultivarCard, 
    epithets, wildcardCard, wildcard, definitions, 
    specimenCommonMatch, specimenLatinMatch,
    definitionCard, traitProperty,
    mixedSpecimenTiles, nonTaxonSpecimenTiles,
    mixedSpecimenQuestions } = screens;

const mixedSpeciesMatch = {
    name: 'screen-mixed-species-match',
    type: 'test',
    score: 1,
    kind: 'VMC',
    points: 3,
    given: 'Given species name',    
    requirement: 'Select species image',
    screens: [
        { ...mixedSpecimenTiles },
        { ...mixedSpecimenQuestions }
    ]
};

const speciesRevision = {
    name: 'screen-species-card',
    type: 'revision',
    score: 0,
    kind: 'S',
    points: 0,
    given: 'Given species summary',
    requirement: 'Study species',
    screens: [
        { ...specimen },
        { ...speciesCard }
    ]
};

const taxonRevision = {
    name: 'screen-taxon-card',
    type:'revision',
    score: 0,
    kind: 'F',
    points: 0,
    given: 'Study',
    requirement: 'Family summary',
    screens: [
        { ...specimen },
        { ...taxon }
    ]
};

const nonTaxonRevision = {
    name: 'screen-non-taxon-card',
    type:'revision',
    score: 0,
    kind: 'F',
    points: 0,
    given: 'Study',
    requirement: 'Group summary',
    screens: [
        { ...nonTaxonSpecimenTiles },
        { ...nonTaxon }
    ]
};

const definitionRevision = {
    name: 'screen-definition-card',
    type:'revision',
    score: 0,
    kind: 'G',
    points: 0,
    given: 'Given glossary',
    requirement: 'Study definitions',
    screens: [
        { ...specimen },
        { ...definitionCard }
    ]
};

// 1 point

const imageToImageMatch = {
    name: 'screen-image-to-image',
    type:'test',
    score: 1,
    points: 1,
    kind: 'MC',
    given: 'Species specimens',
    requirement: 'Species images',
    screens: [
        { ...specimen },
        { ...species }
    ]
};

const latinToCommonMatch = {
    name: 'screen-latin-to-common',
    type:'test',
    score: 1,
    points: 1,
    kind: 'MC',
    given: 'Given latin name',
    requirement: 'Select common name',
    screens: [
        { ...specimen },
        { ...vernaculars }
    ]
};

const commonToLatinMatch = {
    name: 'screen-common-to-latin',
    type:'test',
    score: 1,
    points: 1,
    kind: 'MC',
    given: 'Given common name',
    requirement: 'Select latin name',
    screens: [
        { ...specimen },
        { ...scientifics }
    ]
};

const textCompleteGenus = {
    name: 'screen-genus-completion',
    type:'test',
    score: 1,
    points: 1,
    kind: 'MC',
    given: 'Given species name',
    requirement: 'Select genus name',
    screens: [
        { ...specimen },
        { ...textComplete, type: 'text-complete-genus'  }
    ]
};

const multiSpecimenCommonMatch = {
    name: 'screen-specimens-common-match',
    type:'test',
    score: 1,
    points: 1,
    kind: 'VMC',
    given: 'Given specimen images',
    requirement: 'Select commnon name',
    screens: [
        { ...specimen },
        { ...specimenCommonMatch }
    ]
};

const multiSpecimenLatinMatch = {
    name: 'screen-specimens-latin-match',
    type:'test',
    score: 1,
    points: 1,
    kind: 'VMC',
    given: 'Given specimen images',
    requirement: 'Select latin name',
    screens: [
        { ...specimen },
        { ...specimenLatinMatch }
    ]
};

const traitPropertyMatch = {
    name: 'trait-property-match',
    type:'test',
    score: 1,
    points: 1,
    kind: 'MC',
    given: 'Given specimen images',
    requirement: 'Select trait value',
    screens: [
        { ...specimen },
        { ...traitProperty }
    ]
};

//  2 points

const familyMatch = {
    name: 'screen-species-to-family',
    type:'test',
    score: 1,
    points: 2,
    kind: 'MC',
    given: 'Species name',
    requirement: 'List families',
    screens: [
        { ...specimen },
        { ...family }
    ]
};

const cultivarMatch = {
    name: 'screen-cultivar-to-species',
    type:'test',
    score: 1,
    points: 2,
    kind: 'MC',
    given: 'Cultivar name',
    requirement: 'List species',
    screens: [
        { ...specimen },
        { ...cultivar }
    ]
};

const familyStripsMatch = {
    name: 'screen-family-to-description',
    type:'test',
    score: 1,
    points: 2,
    kind: 'MC',
    given: 'Family description',
    requirement: 'List families',
    screens: [
        { ...specimen },
        { ...familyStrips }
    ]
};

const genusEntry = {
    name: 'screen-genus-entry',
    type:'test',
    score: 1,
    points: 2,
    kind: 'T',
    given: 'Given species name',
    requirement: 'Enter genus name',
    screens: [
        { ...specimen },
        { ...text, template: 'js-genus-entry-template', taxon: 'genus'}
    ]
};

const speciesEntry = {
    name: 'screen-species-entry',
    type:'test',
    score: 1,
    points: 2,
    kind: 'T',
    given: 'Given genus name',
    requirement: 'Enter species name',
    screens: [
        { ...specimen },
        { ...text, template: 'js-species-entry-template', taxon: 'species'}
    ]
};

const speciesGenusEntry = {
    name: 'screen-binomial-entry',
    type:'test',
    score: 1,
    points: 4,
    kind: 'T',
    given: 'Given common name',
    requirement: 'Enter latin name',
    screens: [
        { ...specimen },
        { ...text, template: 'js-species-genus-entry-template', taxon: 'name'}
    ]
};

const commandLayout = {
    name: 'screen-command',
    type:'test',
    score: 1,
    points: 2,
    kind: 'T',
    given: 'Various',
    requirement: 'various',
    screens: [
        { ...command },
    ]
};

const leafEntry = {
    type:'test',
    score: 1,
    points: 3,
    kind: 'T',
    screens: [
        { ...leaf },
        { ...leafName, template: 'js-text-entry-template' }
    ]
};

const textCompleteSpecies = {
    name: 'screen-species-completion',
    type:'test',
    score: 1,
    points: 2,
    kind: 'MC',
    given: 'Given genus name',
    requirement: 'Select species name',
    screens: [
        { ...specimen },
        { ...textComplete, type: 'text-complete-species' }
    ]
};

const commonEntry = {
    name: 'screen-common-entry',
    type:'test',
    score: 1,
    points: 2,
    kind: 'T',
    given: 'Species latin name',
    requirement: 'Enter common name',
    screens: [
        { ...specimen },
        { ...text, template: 'js-vernacular-entry-template', taxon: 'vernacular', headers: { long: 'Enter the common name', short: 'Enter the common name'}}
    ]
};

const latinEpithets = {
    name: 'screen-epithets',
    type: 'test',
    score: 1,
    points: 1,
    kind: 'MC',
    given: 'Epithet',
    requirement: 'List epithet definitions',
    screens: [
        { ...specimen },
        { ...epithets }
    ]
};

const glossaryTerms = {
    name: 'screen-definitions',
    type: 'test',
    score: 1,
    points: 1,
    kind: 'T',
    given: 'Given glossary term',
    requirement: 'Select definition',
    screens: [
        { ...specimen },
        { ...definitions }
    ]
};

const cultivars = {
    name: 'screen-cultivars',
    type: 'test',
    score: 1,
    points: 1,
    kind: 'T',
    given: 'List of cultivars',
    requirement: 'List of species',
    screens: [
        { ...specimen },
        { ...cultivarCard },
        { ...cultivar }
    ]
};

const connections = {
    name: 'screen-connections',
    type: 'test',
    score: 1,
    points: 1,
    kind: 'MC',
    given: 'List of traits',
    requirement: 'List of species',
    screens: [
        { ...specimen },
        { ...wildcardCard },
        { ...wildcard }
    ]
};

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
                nonTaxonRevision,                              
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

const lichenLessonLandscape = { ...landscapeLesson3, id: 4 };
lichenLessonLandscape.levels[0] = {   id: 1,
    name:'Level 1',
    description: 'Species recognition',
    layouts: [ 
        nonTaxonRevision,                              
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
    lichenLessonLandscape
]