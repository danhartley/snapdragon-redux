import { types } from 'redux/actions/action-types';
import { activeLayouts, reviseActiveLayouts } from 'syllabus/lesson-planner';

const initialLayoutsState = activeLayouts;
const initialLayoutState = initialLayoutsState[0];
let revisedLayoutState = null;
 
export const layouts = (state = initialLayoutsState, action) => {
    switch(action.type) {
        case types.RESET:
            const excludeRevision = true;
            revisedLayoutState = reviseActiveLayouts(action.data.length, excludeRevision);
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
