import { types } from 'redux/actions/action-types';

export const lessonPlan = (state = null, action) => {
    switch(action.type) {
        case types.NEXT_LESSON:
            return action.data;
        default:
            return state;
    }
};

export const layout = (state = null, action) => { 
    switch(action.type) {
        case types.NEXT_LESSON:
            return action.data.layouts[0];
        case types.NEXT_LAYOUT:
            return action.data;
        default: 
            return state;
    }
};
