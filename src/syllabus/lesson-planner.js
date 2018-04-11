import { lesson1Layouts } from 'syllabus/lesson-plans';
import { createLesson } from 'syllabus/lesson-helpers';
import { screens } from 'ui/layouts/species-layouts';

const { specimen, revision, species, vernaculars, scientifics, summary, history } = screens;
const { layout1, layout2, layout3, layout4 } = lesson1Layouts;

const createLesson1 = (name, moduleSize, excludeRevision) => {

    let layouts = [ layout1, layout2, layout3, layout4 ];

    if(excludeRevision) {
        layouts = layouts.filter(layout => layout.name !== 'revision');
    }

    const revisedLayouts = createLesson(
        name,
        moduleSize,
        layouts,
        [ summary, history ]
        );

    return revisedLayouts;
};

export const prepareLessonPlan = (name, moduleSize, excludeRevision = false) => {
    switch(name) {
        case 'lesson1':
            return createLesson1(name, moduleSize, excludeRevision);
        default: 
            return createLesson1(name, moduleSize, excludeRevision);
    }    
};
