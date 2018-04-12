import { lessonPlans } from 'syllabus/lesson-plans';
import { createLessonLayouts } from 'syllabus/lesson-helpers';
import { screens } from 'ui/layouts/species-layouts';

const { summary, history } = screens;

export const createLessonPlan = (lessonName, levelName, moduleSize, excludeRevision = false) => {
    switch(lessonName) {
        case 'lesson1':
            return createLessonLayouts(lessonName, levelName, moduleSize, lessonPlans[lessonName][levelName], [ summary, history ], excludeRevision);
    }    
};
