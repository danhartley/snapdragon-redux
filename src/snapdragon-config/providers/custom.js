import { iconicTaxa } from 'snapdragon-config/snapdragon-iconic-taxa';

// e.g. species are fixed i.e. list drawn up using the species picker

const staticLesson = { 
    id: 10000,
    behaviour: 'static',
    name: 'User collection', 
    guideType: 'PICKER',
    moduleSize: 1,
    lessonPlanLandscape: 1,
    lessonPlanPortrait: 101,
    glossary: ['common'],
    itemNames: [],
    items: [],
    iconicTaxa: iconicTaxa.all
};

// e.g. species will vary depending on location, etc.

const dynamicLesson = { 
    id: 10001,
    behaviour: 'dynamic',
    name: 'User collection', 
    guideType: 'LOCATION',
    moduleSize: 1,
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