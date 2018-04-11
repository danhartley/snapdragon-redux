import { types } from 'redux/actions/action-types';
import { prepareLessonPlan } from 'syllabus/lesson-planner';

let newLessonPlan = null;
 
export const layouts = (state = null, action) => {
    switch(action.type) {
        case types.NEXT_LESSON:
            return action.data;
        case types.RESET:
            const name = 'lesson1';
            const excludeRevision = true;
            newLessonPlan = prepareLessonPlan(name, action.data.length, excludeRevision);
            return newLessonPlan;
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
            return newLessonPlan[0];
        default: 
            return state;
    }
};
