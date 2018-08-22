import { screens } from 'snapdragon/screen-layouts';

const { specimen, revision, species, vernaculars, scientifics, text, command, leaf, leafName, family, familyStrips, taxon, textComplete, cultivar } = screens;

const speciesRevision = {
    name: 'screen-species-card',
    type: 'revision',
    score: 0,
    screens: [
        { ...specimen },
        { ...revision }
    ]
};

const taxonRevision = {
    name: 'screen-taxon-card',
    type:'revision',
    screens: [
        { ...specimen },
        { ...taxon }
    ]
};

const imageToImageMatch = {
    name: 'screen-image-to-image',
    type:'test',
    score: 1,
    points: 1,
    screens: [
        { ...specimen },
        { ...species }
    ]
};

const familyMatch = {
    name: 'screen-species-to-family',
    type:'test',
    score: 1,
    points: 1,
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
    screens: [
        { ...specimen },
        { ...familyStrips }
    ]
};

const latinToCommonMatch = {
    name: 'screen-latin-to-common',
    type:'test',
    score: 1,
    points: 2,
    screens: [
        { ...specimen },
        { ...vernaculars }
    ]
};

const commonToLatinMatch = {
    name: 'screen-common-to-latin',
    type:'test',
    score: 1,
    points: 2,
    screens: [
        { ...specimen },
        { ...scientifics }
    ]
};

const genusEntry = {
    name: 'screen-genus-entry',
    type:'test',
    score: 1,
    points: 3,
    screens: [
        { ...specimen },
        { ...text, template: 'js-genus-entry-template', taxon: 'genus'}
    ]
};

const speciesEntry = {
    name: 'screen-species-entry',
    type:'test',
    score: 1,
    points: 3,
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
    screens: [
        { ...command },
    ]
};

const leafEntry = {
    type:'test',
    score: 1,
    points: 3,
    screens: [
        { ...leaf },
        { ...leafName, template: 'js-text-entry-template' }
    ]
};

const textCompleteGenus = {
    name: 'screen-genus-completion',
    type:'test',
    score: 1,
    points: 2,
    screens: [
        { ...specimen },
        { ...textComplete, type: 'text-complete-genus'  }
    ]
};

const textCompleteSpecies = {
    name: 'screen-species-completion',
    type:'test',
    score: 1,
    points: 2,
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
    screens: [
        { ...specimen },
        { ...text, template: 'js-vernacular-entry-template', taxon: 'vernacular', headers: { long: 'Enter the common name', short: 'Enter the common name'}}
    ]
};

const landscapeLesson1 = {
    id: 1,
    name:'Lesson 1',
    portrait: false,
    levels: [
        {   id: 1,
            name:'Level 1',
            description: 'Receptive only',
            layouts: [ speciesRevision, latinToCommonMatch, commonToLatinMatch, textCompleteGenus ]
            // layouts: [ speciesRevision, latinToCommonMatch, commonToLatinMatch, textCompleteGenus, taxonRevision, familyMatch, commonEntry, textCompleteSpecies, genusEntry, speciesEntry, familyStripsMatch ]
        },
        {   id: 2,
            name:'Level 2',
            description: 'Beginner productive',
            layouts: [ taxonRevision, familyMatch, commonEntry, textCompleteSpecies, genusEntry, speciesEntry, familyStripsMatch ]
        },
        {   id: 3,
            name:'Level 3',
            description: 'Advanced',
            layouts: [ speciesGenusEntry ]
        },
        {   id: 4,
            name:'Level 4',
            description: 'Fun',
            layouts: [ commandLayout ]
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
    name:'Lesson 3',
    portrait: true,
    levels: [
        {   id: 1,
            name:'Level 1',
            description: 'Receptive only',
            layouts: [ speciesRevision, latinToCommonMatch, commonToLatinMatch, textCompleteGenus ]
            // layouts: [ speciesRevision, latinToCommonMatch, commonToLatinMatch, textCompleteGenus, taxonRevision, familyMatch, commonEntry, textCompleteSpecies, genusEntry, speciesEntry, familyStripsMatch ]
        },
        {   id: 2,
            name:'Level 2',
            description: 'Beginner productive',
            layouts: [ taxonRevision, familyMatch, commonEntry, textCompleteSpecies, genusEntry, speciesEntry, familyStripsMatch, taxonRevision ]
        },
        {   id: 3,
            name:'Level 3',
            description: 'Advanced',
            layouts: [ speciesGenusEntry ]
        },
        {   id: 4,
            name:'Level 4',
            description: 'Fun',
            layouts: [ commandLayout ]
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