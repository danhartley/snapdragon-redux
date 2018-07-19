import { screens } from 'snapdragon/screen-layouts';

const { specimen, revision, species, vernaculars, scientifics, text, command, leaf, leafName, family, taxon } = screens;

const speciesRevision = {
    name: 'revision',
    screens: [
        { ...specimen },
        { ...revision }
    ]
};

const taxonRevision = {
    name: 'revision',
    screens: [
        { ...specimen },
        { ...taxon }
    ]
};

const imageToImageMatch = {
    name: 'test',
    score: 1,
    screens: [
        { ...specimen },
        { ...species }
    ]
};

const familyMatch = {
    name: 'test',
    score: 1,
    screens: [
        { ...specimen },
        { ...family }
    ]
};

const latinToCommonMatch = {
    name: 'test',
    score: 1,
    screens: [
        { ...specimen },
        { ...vernaculars }
    ]
};

const commonToLatinMatch = {
    name: 'test',
    score: 1,
    screens: [
        { ...specimen },
        { ...scientifics }
    ]
};

const genusEntry = {
    name: 'test',
    score: 1,
    screens: [
        { ...specimen },
        { ...text, template: 'js-genus-entry-template', taxon: 'genus'}
    ]
};

const speciesEntry = {
    name: 'test',
    score: 1,
    screens: [
        { ...specimen },
        { ...text, template: 'js-species-entry-template', taxon: 'species'}
    ]
};

const speciesGenusEntry = {
    name: 'test',
    score: 1,
    screens: [
        { ...specimen },
        { ...text, template: 'js-species-genus-entry-template', taxon: 'name'}
    ]
};

const commandLayout = {
    name: 'test',
    score: 1,
    screens: [
        { ...command },
    ]
};

const leafEntry = {
    name: 'test',
    score: 1,
    screens: [
        { ...leaf },
        { ...leafName, template: 'js-text-entry-template' }
    ]
};

const commonEntry = {
    name: 'test',
    score: 1,
    screens: [
        { ...specimen },
        { ...text, template: 'js-vernacular-entry-template', taxon: 'vernacular', headers: { long: 'Enter the common name', short: 'Enter the common name'}}
    ]
};

const landscapeLesson1 = {
    id: 1,
    name: 'Lesson 1',
    portrait: false,
    levels: [
        {   id: 1,
            name: 'Level 1',
            description: 'Level 1',
            layouts: [ speciesRevision, imageToImageMatch, taxonRevision ]
            // layouts: [ speciesRevision, imageToImageMatch, latinToCommonMatch, commonToLatinMatch, familyMatch, taxonRevision ]
        },
        {   id: 2,
            name: 'Level 2',
            description: 'Recall common name',
            layouts: [ commonEntry ]            
        },
        {   id: 3,
            name: 'Level 3',
            description: 'Complete latin name',
            layouts: [ speciesRevision, genusEntry, speciesEntry, commonEntry, speciesGenusEntry ]
        },
        {   id: 4,
            name: 'Level 4',
            description: 'Enter full latin name',
            layouts: [ speciesRevision, speciesGenusEntry ]
        },
        {   id: 5,
            name: 'Level 5',
            description: 'Name puzzle',
            layouts: [ speciesRevision, commandLayout ]
        }        
    ]
};

const landscapeLesson2 = {
    id: 2,
    name: 'Lesson 2',
    portrait: false,
    levels: [
        {   id: 1,
            name: 'Level 1',
            description: 'Name the leaf structure',
            layouts: [ leafEntry ]
        }
    ]
};

const portraitLesson1 = {
    id: 3,
    name: 'Lesson 3',
    portrait: true,
    levels: [
        {   id: 1,
            name: 'Level 1',
            description: 'Match species',
            layouts: [ speciesRevision,  taxonRevision ]
            // layouts: [ speciesRevision, latinToCommonMatch, commonToLatinMatch, familyMatch ]
        },
        {   id: 2,
            name: 'Level 2',
            description: 'Recall common name',
            layouts: [ commonEntry ]
        },
        {   id: 3,
            name: 'Level 3',
            description: 'Complete latin name',
            layouts: [ genusEntry, genusEntry, speciesEntry ]
        },
        {   id: 4,
            name: 'Level 4',
            description: 'Enter full latin name',
            layouts: [ speciesGenusEntry ]
        },
        {   id: 5,
            name: 'Level 5',
            description: 'Name puzzle',
            layouts: [ commandLayout ]
        }
    ]
};

const portraitLesson2 = {
    id: 4,
    name: 'Lesson 4',
    portrait: true,
    levels: [
        {   id: 1,
            name: 'Level 1',
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