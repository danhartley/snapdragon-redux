import { utils } from 'utils/utils';
import { types } from 'redux/actions/action-types';
import { lessonPlanner } from 'syllabus/lesson-planner';

const initialLayoutsState = lessonPlanner.lessonLayouts[0];
const initialLayoutState = initialLayoutsState[0];
let revisedLayoutState = null;
 
export const layouts = (state = initialLayoutsState, action) => {
    switch(action.type) {
        case types.RESET:
            revisedLayoutState = lessonPlanner.reviseLessonLayouts(action.data.length)[0];
            return revisedLayoutState;
        default:
            return state;
    }
};

export const layout = (state = initialLayoutState, action) => { 
    switch(action.type) {
        case types.NEXT_LAYOUT:
            return action.data;
        case types.RESET:
            return revisedLayoutState[0];
        default: 
            return state;
    }
};
