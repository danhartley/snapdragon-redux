import { screens } from 'snapdragon/screen-layouts';

const { specimen, revision, species, vernaculars, scientifics, text, command, leaf, leafName, family, familyStrips, taxon, textComplete, cultivar, cultivarCard, epithets, wildcardCard, wildcard, definitions } = screens;

const speciesRevision = {
    name: 'screen-species-card',
    type: 'revision',
    score: 0,
    kind: 'S',
    points: 0,
    given: 'Study',
    options: 'Species summary',
    screens: [
        { ...specimen },
        { ...revision }
    ]
};

const taxonRevision = {
    name: 'screen-taxon-card',
    type:'revision',
    score: 0,
    kind: 'F',
    points: 0,
    given: 'Study',
    options: 'Family summary',
    screens: [
        { ...specimen },
        { ...taxon }
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
    options: 'Species images',
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
    given: 'Species latin name',
    options: 'List common names',
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
    given: 'Species common name',
    options: 'List latin names',
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
    given: 'Species species name',
    options: 'Choose genus name',
    screens: [
        { ...specimen },
        { ...textComplete, type: 'text-complete-genus'  }
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
    options: 'List families',
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
    options: 'List species',
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
    options: 'List families',
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
    given: 'Species species name',
    options: 'Enter genus name',
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
    given: 'Species genus name',
    options: 'Enter species name',
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
    given: 'Species common name',
    options: 'Enter latin name',
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
    options: 'various',
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
    kind: 'T',
    given: 'Species genus name',
    options: 'Select species name',
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
    options: 'Enter common name',
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
    kind: 'T',
    given: 'Epithet',
    options: 'List epithet definitions',
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
    given: 'Term',
    options: 'List term definitions',
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
    options: 'List of species',
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
    kind: 'T',
    given: 'List of traits',
    options: 'List of species',
    screens: [
        { ...specimen },
        { ...wildcardCard },
        { ...wildcard }
    ]
};

const landscapeLesson1 = {
    id: 1,
    name:'Lesson 1',
    portrait: false,
    default: true,
    levels: [
        {   id: 1,
            name:'Level 1',
            layouts: [ speciesRevision, latinToCommonMatch, commonToLatinMatch, textCompleteGenus ],
            wildcardLayouts : [],
            reviewLayouts: [ latinToCommonMatch ]
        },
        {   id: 2,
            name:'Level 2',
            layouts: [ commonEntry, textCompleteSpecies, genusEntry ],
            wildcardLayouts : [ latinEpithets ],
            reviewLayouts: [ commonEntry, textCompleteSpecies, genusEntry ]
        },
        {   id: 3,
            name:'Level 3',
            layouts: [ speciesEntry ],
            wildcardLayouts : [ glossaryTerms ],
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
            layouts: [ speciesRevision, commonToLatinMatch ],
            wildcardLayouts : [glossaryTerms],
            reviewLayouts: [ commonToLatinMatch ]
        },
        {   id: 2,
            name:'Level 2',
            layouts: [ taxonRevision, familyMatch, familyStripsMatch ],
            wildcardLayouts : [],
            reviewLayouts: [ familyMatch, familyStripsMatch ]
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
            layouts: [ speciesRevision, latinToCommonMatch, commonToLatinMatch, textCompleteGenus ],
            wildcardLayouts : [],
            reviewLayouts: [ latinToCommonMatch ]
        },
        {   id: 2,
            name:'Level 2',
            layouts: [ commonEntry, textCompleteSpecies, genusEntry ],
            wildcardLayouts : [ [epithets] ],
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
            wildcardLayouts : [[cultivarCard, cultivar]],
            reviewLayouts: [ speciesGenusEntry ]
        },
        {   id: 5,
            name:'Level 5',
            layouts: [ taxonRevision, familyMatch, familyStripsMatch ],
            wildcardLayouts : [[wildcardCard, wildcard]],
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
            layouts: [ speciesRevision, commonToLatinMatch ],
            wildcardLayouts : [glossaryTerms],
            reviewLayouts: [ commonToLatinMatch ]
        },
        {   id: 2,
            name:'Level 2',
            layouts: [ taxonRevision, familyMatch, familyStripsMatch ],
            wildcardLayouts : [],
            reviewLayouts: [ familyMatch, familyStripsMatch ]
        }   
    ]
};

export const lessonPlans = [
    landscapeLesson1,
    landscapeLesson2, 
    landscapeLesson3,
    portraitLesson1,
    portraitLesson2,
    portraitLesson3
]