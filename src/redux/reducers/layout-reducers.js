import { types } from 'redux/actions/action-types';
import { createLessonPlan } from 'syllabus/lesson-planner';

let nextLessonLayouts = null;
 
export const layouts = (state = null, action) => {
    switch(action.type) {
        case types.NEXT_LESSON:
            return action.data;
        case types.RESET:
            const items = action.data;
            const config = action.data.config;
            const lessonName = config.lessons.filter(lesson => lesson.id === config.active.lesson)[0].name;
            const levelName = config.levels.filter(level => level.id === config.active.level)[0].name;
            const excludeRevision = true;
            nextLessonLayouts = createLessonPlan(lessonName, levelName, items.length, excludeRevision);
            return nextLessonLayouts;
        default:
            return state;
    }
};

export const layout = (state = null, action) => { 
    switch(action.type) {
        case types.NEXT_LESSON:
            return action.data[0];
        case types.NEXT_LAYOUT:
            return action.data;
        case types.RESET:
            return nextLessonLayouts[0];
        default: 
            return state;
    }
};
