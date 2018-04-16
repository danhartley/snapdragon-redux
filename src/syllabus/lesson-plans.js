import { screens } from 'ui/layouts/species-layouts';

const { specimen, revision, species, vernaculars, scientifics, summary, history, text } = screens;

const layout1 = {
    name: 'revision',
    screens: [
        { ...specimen },
        { ...revision }
    ]
};

const layout2 = {
    name: 'test',
    screens: [
        { ...specimen },
        { ...species }
    ]
};

const layout3 = {
    name: 'test',
    screens: [
        { ...specimen },
        { ...vernaculars }
    ]
};

const layout4 = {
    name: 'test',
    screens: [
        { ...specimen },
        { ...scientifics }
    ]
};

const layout5 = {
    name: 'test',
    screens: [
        { ...specimen },
        { ...text, template: 'js-genus-entry-template', taxon: 'genus'}
    ]
};

const layout6 = {
    name: 'test',
    screens: [
        { ...specimen },
        { ...text, template: 'js-species-entry-template', taxon: 'species'}
    ]
};

const layout7 = {
    name: 'test',
    screens: [
        { ...specimen },
        { ...text, template: 'js-species-genus-entry-template', taxon: 'name'}
    ]
};

const lesson1 = {
    id: 1,
    name: 'lesson1',
    levels: [
        {   id: 1,
            name: 'level1',
            layouts: [ layout1, layout2, layout3, layout4 ]
        },
        {   id: 2,
            name: 'level2',
            layouts: [ layout1, layout5 ]
        },
        {   id: 3,
            name: 'level3',
            layouts: [ layout1, layout6 ]
        },
        {   id: 4,
            name: 'level4',
            layouts: [ layout1, layout7 ]
        }
    ]
};
export const lessonPlans = [
    lesson1
]