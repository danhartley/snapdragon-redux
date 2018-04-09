import { utils } from 'utils/utils';
import { types } from 'redux/actions/species-action-types';
// import { modules } from 'syllabus/species';
import { speciesLayouts } from 'ui/layouts/species-layouts';
import { lessonPlanner } from 'syllabus/lesson-planner';

const initialLayoutsState = lessonPlanner.lessonLayouts[0];
const initialLayoutState = initialLayoutsState[0];
 
export const layouts = (state = initialLayoutsState, action) => {
    switch(action.type) {
        case types.RESET:
            return initialLayoutState;
        default:
            return state;
    }
};

// export const layout = (state = initialLayoutState, action) => { 
//     switch(action.type) {
//         case types.NEXT_LAYOUT:
//             return action.data;
//         case types.RESET:
//             return initialLayoutState;
//         default: 
//             return state;
//     }
// };
