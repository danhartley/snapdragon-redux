import { types } from 'redux/actions/action-types';
import { config as lessonConfig } from 'syllabus/lesson-config';
 
export const config = (state = lessonConfig, action) => {
    switch(action.type) {
        case types.RESET:
            return state;
        default: 
            return state;
    }
};

export const lesson = (state = 1, action) => {
    return state;
};

export const layouts = (state = null, action) => {
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
            return action.data[0];
        case types.NEXT_LAYOUT:
            return action.data;
        default: 
            return state;
    }
};
