import { iconicTaxa } from 'snapdragon-config/snapdragon-iconic-taxa';

// e.g. species will vary depending on location and season

const byLocationCollection = { 
    id: 10001,
    behaviour: 'dynamic',
    name: 'Location collection', 
    guideType: 'LOCATION',
    moduleSize: 1,
    lessonPlanLandscape: 1,
    lessonPlanPortrait: 101,
    glossary: ['common'],
    itemNames: [],
    items: [],
    iconicTaxa: iconicTaxa.all
};

// e.g. based on iNat user or project observations

const byInatCollection = { 
    id: 10001,
    behaviour: 'dynamic',
    name: 'Inat collection', 
    guideType: 'INAT',
    moduleSize: 1,
    lessonPlanLandscape: 1,
    lessonPlanPortrait: 101,
    glossary: ['common'],
    itemNames: [],
    items: [],
    iconicTaxa: iconicTaxa.all
};

// e.g. species are fixed i.e. list drawn up using the species picker

const byPickerCollection = { 
    id: 10000,
    behaviour: 'static',
    name: 'Named species collection', 
    guideType: 'PICKER',
    moduleSize: 1,
    lessonPlanLandscape: 1,
    lessonPlanPortrait: 101,
    glossary: ['common'],
    itemNames: [],
    items: [],
    iconicTaxa: iconicTaxa.all
};

export const custom = [
    byLocationCollection,
    byInatCollection,
    byPickerCollection
];