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

const lesson1 = {
    level1:
        [ layout1,
          layout2,
          layout3,
          layout4 ],
    level2:
        [ layout1,
          layout5 ]
};
export const lessonPlans = {
    lesson1
}