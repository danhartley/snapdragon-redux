import { screens } from 'ui/layouts/species-layouts';
import { createLesson } from 'syllabus/syllabus-helpers';

const { specimen, revision, species, vernaculars, scientifics, summary, history } = screens;

const selectionSize = 2;

const layout1 = {    
    screens: [
        { ...specimen },
        { ...revision }
    ]
}

const layout2 = {
    screens: [
        { ...specimen },
        { ...species }
    ]
}

const layout3 = {
    screens: [
        { ...specimen },
        { ...vernaculars }
    ]
}

const layout4 = {
    screens: [
        { ...specimen },
        { ...scientifics }
    ]
}

const lesson1Layouts = createLesson(
    [ layout1, layout2, layout3,layout4 ],
    [ summary, history ],
    selectionSize
);

let lessonLayouts = [];

lessonLayouts.push(lesson1Layouts);

const reviseLessonLayouts = selectionSize => {
    const revisedLayouts = createLesson([ layout1, layout2, layout3,layout4 ],
        [ summary, history ],
        selectionSize);
    lessonLayouts = [];
    lessonLayouts.push(revisedLayouts);
    return lessonLayouts;
};

export const lessonPlanner = { 
    lessonLayouts,
    reviseLessonLayouts
};

