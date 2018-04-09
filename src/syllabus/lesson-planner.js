import { screens } from 'ui/layouts/species-layouts';

// Take collectin or set of 12 items
// Take first 3 items from the colletion
// Show the:
// LEFT: specimen images RIGHT: species card
// Show the:
// LEFT: specimen images RIGHT: multiple choice species image tiles
// Show the:
// LEFT: specimen images RIGHT: multiple choice species vernacular names
// Show the:
// LEFT: specimen images RIGHT: multiple choice species scientific names

const layout1 = {    
    screens: [
        { ...screens.specimen },
        { ...screens.revision }
    ]
}

const layout2 = {
    screens: [
        { ...screens.specimen },
        { ...screens.tiles }
    ]
}

const layout3 = {
    screens: [
        { ...screens.specimen },
        { ...screens.strips }
    ]
}

const layout4 = {
    screens: [
        { ...screens.specimen },
        { ...screens.binomialStrips }
    ]
}

const lesson1Layouts = [
    { ...layout1, id: 1},
    { ...layout1, id: 2},
    { ...layout1, id: 3},
    { ...layout2, id: 4},
    { ...layout2, id: 5},
    { ...layout2, id: 6},
    { ...layout3, id: 7},
    { ...layout3, id: 8},
    { ...layout3, id: 9},
    { ...layout4, id: 10},
    { ...layout4, id: 11},
    { ...layout4, ...{ screens: [...screens.summary, ...screens.history] }, id: 12 },
];

const lessonLayouts = [];

lessonLayouts.push(lesson1Layouts);

export const lessonPlanner = { lessonLayouts: lessonLayouts };

