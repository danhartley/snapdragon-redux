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
    options: 'Enter species name',
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
            reviewLayouts: [ latinToCommonMatch, commonToLatinMatch, textCompleteGenus ]
        },
        {   id: 2,
            name:'Level 2',
            layouts: [ taxonRevision, commonEntry, textCompleteSpecies, genusEntry, familyStripsMatch ],
            wildcardLayouts : [ [specimen, epithets], [specimen, cultivarCard, cultivar], [specimen, wildcardCard, wildcard], [specimen, definitions] ],
            reviewLayouts: [ commonEntry, textCompleteSpecies, genusEntry ]
        },
        {   id: 3,
            name:'Level 3',
            layouts: [ speciesEntry, familyMatch ]
        },
        {   id: 4,
            name:'Level 4',
            layouts: [ speciesGenusEntry ]
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

const portraitLesson1 = {
    id: 3,
    name:'Lesson 1',
    portrait: true,
    default: true,
    levels: [
        {   id: 1,
            name:'Level 1',
            layouts: [ speciesRevision, latinToCommonMatch, commonToLatinMatch, textCompleteGenus ]
        },        
        {   id: 2,
            name:'Level 2',
            layouts: [ taxonRevision, commonEntry, textCompleteSpecies, genusEntry, familyStripsMatch ]
        },
        {   id: 3,
            name:'Level 3',
            layouts: [ speciesEntry, familyMatch ]
        },
        {   id: 4,
            name:'Level 4',
            layouts: [ speciesGenusEntry ]
        }    
    ]
};

const portraitLesson2 = {
    id: 4,
    name:'Lesson 4',
    portrait: true,
    levels: [
        {   id: 1,
            name:'Level 1',
            description: 'Name the leaf structure',
            layouts: [ leafEntry ]
        }
    ]
};

export const lessonPlans = [
    landscapeLesson1,
    landscapeLesson2, 
    portraitLesson1,
    portraitLesson2
]