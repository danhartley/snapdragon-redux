import { screens } from 'ui/layouts/species-layouts';
import { createLesson } from 'syllabus/syllabus-helpers';

const selectionSize = 3;

const layout1 = {    
    screens: [
        { ...screens.specimen },
        { ...screens.revision }
    ]
}

const layout2 = {
    screens: [
        { ...screens.specimen },
        { ...screens.species }
    ]
}

const layout3 = {
    screens: [
        { ...screens.specimen },
        { ...screens.vernaculars }
    ]
}

const layout4 = {
    screens: [
        { ...screens.specimen },
        { ...screens.scientifics }
    ]
}

const lesson1Layouts = createLesson(
    [ layout1, layout2, layout3,layout4 ], 
    [ screens.summary, screens.history ],
    selectionSize
);

const lessonLayouts = [];

lessonLayouts.push(lesson1Layouts);

export const lessonPlanner = { lessonLayouts: lessonLayouts };

