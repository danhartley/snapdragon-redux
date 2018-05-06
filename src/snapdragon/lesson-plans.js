import { screens } from 'snapdragon/screen-layouts';

const { specimen, revision, species, vernaculars, scientifics, summary, history, text, command, leaf, leafName } = screens;

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

const lesson1 = {
    id: 1,
    name: 'Lesson 1',
    levels: [
        {   id: 1,
            name: 'Level 1',
            description: 'Click the species image or name',
            layouts: [ layout1, layout2, layout3, layout4 ]
        },
        {   id: 2,
            name: 'Level 2',
            description: 'Enter the genus name',
            layouts: [ layout1, layout5 ]
        },
        {   id: 3,
            name: 'Level 3',
            description: 'Enter the species name',
            layouts: [ layout1, layout6 ]
        },
        {   id: 4,
            name: 'Level 4',
            description: 'Enter the genus and species name',
            layouts: [ layout1, layout7 ]
        },
        {   id: 5,
            name: 'Level 5',
            description: 'Piece the name back together',
            layouts: [ layout8 ]
        }
    ]
};

const lesson2 = {
    id: 2,
    name: 'Lesson 2',
    levels: [
        {   id: 1,
            name: 'Level 1',
            description: 'Name the leaf structure',
            layouts: [ layout9 ]
        }
    ]
};

export const lessonPlans = [
    lesson1,
    lesson2
]