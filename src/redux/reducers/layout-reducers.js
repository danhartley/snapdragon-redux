import { types } from 'redux/actions/action-types';

export const lessonPlans = (state = null, action) => {
    switch(action.type) {
        case types.CHANGE_LESSON_PLANS:
            return action.data;
        default:
            return state;
    }
};

export const lessonPlan = (state = null, action) => {
    switch(action.type) {
        case types.CHANGE_LESSON_PLAN:
            return action.data || state;
        case types.NEXT_LESSON:
            return action.data.lessonPlan || state;
        case types.SAVE_USER_PROGRESS:
            return action.data.lesson.lessonPlan || state;
        default:
            return state;
    }
};

export const layout = (state = null, action) => { 
    switch(action.type) {
        case types.NEXT_LAYOUT:
            if(state) {
                if(action.data.screens.length > 1) { // sometimes BUG here
                    return action.data;
                } else {
                    return action.data;
                }
            } else {
                return action.data;
            }
        case types.SAVE_USER_PROGRESS:
            return action.data.lesson.layout || state;
        default: 
            return state;
    }
};
