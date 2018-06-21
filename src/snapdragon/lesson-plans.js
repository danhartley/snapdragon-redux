import { screens } from 'snapdragon/screen-layouts';

const { specimen, revision, species, vernaculars, scientifics, summary, history, text, command, leaf, leafName } = screens;

const portrait1 = {
    name: 'revision',
    screens: [{ ...revision }]
};

const portrait2 = {
    name: 'test',
    score: 1,
    screens: [{ ...species }]
};

const portrait3 = {
    name: 'test',
    score: 1,
    screens: [{ ...vernaculars }]
};

const portrait4 = {
    name: 'test',
    score: 1,
    screens: [{ ...scientifics }]
};

const portrait5 = {
    name: 'test',
    score: 1,
    screens: [{ ...text, template: 'js-genus-entry-template', taxon: 'genus'}]
};

const portrait6 = {
    name: 'test',
    score: 1,
    screens: [{ ...text, template: 'js-species-entry-template', taxon: 'species'}]
};

const portrait7 = {
    name: 'test',
    score: 1,
    screens: [{ ...text, template: 'js-species-genus-entry-template', taxon: 'name'}]
};

const portrait8 = {
    name: 'test',
    score: 1,
    screens: [{ ...text, template: 'js-vernacular-entry-template', taxon: 'vernacular', headers: { long: 'Enter the common name', short: 'Enter the common name'}}]    
};

const layout1 = {
    name: 'revision',
    screens: [
        { ...specimen },
        { ...revision }
    ]
};

const layout2 = {
    name: 'test',
    score: 1,
    screens: [
        { ...specimen },
        { ...species }
    ]
};

const layout3 = {
    name: 'test',
    score: 1,
    screens: [
        { ...specimen },
        { ...vernaculars }
    ]
};

const layout4 = {
    name: 'test',
    score: 1,
    screens: [
        { ...specimen },
        { ...scientifics }
    ]
};

const layout5 = {
    name: 'test',
    score: 1,
    screens: [
        { ...specimen },
        { ...text, template: 'js-genus-entry-template', taxon: 'genus'}
    ]
};

const layout6 = {
    name: 'test',
    score: 1,
    screens: [
        { ...specimen },
        { ...text, template: 'js-species-entry-template', taxon: 'species'}
    ]
};

const layout7 = {
    name: 'test',
    score: 1,
    screens: [
        { ...specimen },
        { ...text, template: 'js-species-genus-entry-template', taxon: 'name'}
    ]
};

const layout8 = {
    name: 'test',
    score: 1,
    screens: [
        { ...command },
    ]
};

const layout9 = {
    name: 'test',
    score: 1,
    screens: [
        { ...leaf },
        { ...leafName, template: 'js-text-entry-template' }
    ]
};

const layout10 = {
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
            description: 'Match species',
            layouts: [ layout1, layout2, layout3, layout4 ]
        },
        {   id: 2,
            name: 'Level 2',
            description: 'Recall common name',
            layouts: [ layout10 ]            
        },
        {   id: 3,
            name: 'Level 3',
            description: 'Recall genus name',
            layouts: [ layout1, layout5 ]
        },
        {   id: 4,
            name: 'Level 4',
            description: 'Recall species name',
            layouts: [ layout1, layout6 ]
        },
        {   id: 5,
            name: 'Level 5',
            description: 'Recall genus and species',
            layouts: [ layout1, layout7 ]
        },
        {   id: 6,
            name: 'Level 6',
            description: 'Name puzzle',
            layouts: [ layout1, layout8 ]
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
            layouts: [ layout9 ]
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
            layouts: [ portrait1, portrait2, portrait3, portrait4 ]
        },
        {   id: 2,
            name: 'Level 2',
            description: 'Recall common name',
            layouts: [ portrait8 ]
        },
        {   id: 3,
            name: 'Level 3',
            description: 'Complete latin name',
            layouts: [ portrait5, portrait6 ]
        },
        {   id: 4,
            name: 'Level 4',
            description: 'Enter full latin name',
            layouts: [ portrait7 ]
        },
        {   id: 5,
            name: 'Level 5',
            description: 'Name puzzle',
            layouts: [ layout8 ]
        }
    ]
};

export const lessonPlans = [
    landscapeLesson1,
    landscapeLesson2, 
    portraitLesson1
]