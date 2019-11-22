import { iconicTaxa } from 'snapdragon-config/snapdragon-iconic-taxa';

const staticLesson = { 
    id: 10000,
    behaviour: 'static',
    name: 'User collection', 
    type: 'custom-static',
    moduleSize: 6,
    lessonPlanLandscape: 1,
    lessonPlanPortrait: 101,
    glossary: ['common'],
    itemNames: [],
    items: [],
    iconicTaxa: iconicTaxa.all
};

const dynamicLesson = { 
    id: 10001,
    behaviour: 'dynamic',
    name: 'User collection', 
    type: 'custom',
    moduleSize: 6,
    lessonPlanLandscape: 1,
    lessonPlanPortrait: 101,
    glossary: ['common'],
    itemNames: [],
    items: [],
    iconicTaxa: iconicTaxa.all
};

export const custom = [
    staticLesson,
    dynamicLesson
];