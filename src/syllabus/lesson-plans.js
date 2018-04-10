import { screens } from 'ui/layouts/species-layouts';

const { specimen, revision, species, vernaculars, scientifics, summary, history } = screens;

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

export const lessonLayouts = {
    layout1,
    layout2,
    layout3,
    layout4
};