import { lessonLayouts } from 'syllabus/lesson-plans';
import { createLesson } from 'syllabus/lesson-helpers';
import { screens } from 'ui/layouts/species-layouts';
import { selectionSize } from 'syllabus/lesson-config';

const { specimen, revision, species, vernaculars, scientifics, summary, history } = screens;
const { layout1, layout2, layout3, layout4 } = lessonLayouts;

export const lesson1Layouts = createLesson(
    [ layout1, layout2, layout3, layout4 ],
    [ summary, history ],
    selectionSize,
    'lesson1'
);

export let activeLayouts = lesson1Layouts;

export const reviseActiveLayouts = (selectionSize, excludeRevision = false) => {

    let layouts = [ layout1, layout2, layout3, layout4 ];

    if(excludeRevision) {
        layouts = layouts.filter(layout => layout.name !== 'revision');
    }

    const revisedLayouts = createLesson(layouts,
        [ summary, history ],
        selectionSize);    
        activeLayouts = revisedLayouts;
    return revisedLayouts;
};
